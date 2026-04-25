import { customerModel } from '../models/customerModel.js';
import { itemModel } from '../models/itemModel.js';
import { orderModel } from '../models/orderModel.js';
import { orderView } from '../views/orderView.js';

document.addEventListener("DOMContentLoaded", () => {
    
    loadInitialData();

    const custSelect = document.getElementById("custId");
    custSelect?.addEventListener("change", (e) => {
        const customer = customerModel.searchCustomer(e.target.value);
        if (customer) {
            document.getElementById("custName").value = customer.name;
            document.getElementById("custAddress").value = customer.address;
        }
    });

    const itemSelect = document.getElementById("itemId");
    itemSelect?.addEventListener("change", (e) => {
        const item = itemModel.searchItem(e.target.value);
        if (item) {
            document.getElementById("itemName").value = item.name;
            document.getElementById("unitPrice").value = item.price;
            document.getElementById("qtyOnHand").value = item.qty;
        }
    });

    document.getElementById("btnAddToCart")?.addEventListener("click", () => {
        const itemCode = document.getElementById("itemId").value;
        const orderQty = parseInt(document.getElementById("orderQty").value);
        const qtyOnHand = parseInt(document.getElementById("qtyOnHand").value);

        if (!itemCode) {
            alert("Please select an Item!");
            return;
        }

        if (isNaN(orderQty) || orderQty <= 0) {
            alert("Please enter a valid quantity!");
            return;
        }

        if (orderQty > qtyOnHand) {
            alert("Insufficient stock! Available: " + qtyOnHand);
            return;
        }

        const item = itemModel.searchItem(itemCode);

        if (item) {
            const cartItem = {
                id: item.code,
                name: item.name,
                price: parseFloat(item.price),
                qty: orderQty,
                total: parseFloat(item.price) * orderQty
            };

            orderView.appendToTable(cartItem);

            clearItemFields();
        }
    });



document.getElementById("btnPlaceOrder")?.addEventListener("click", () => {
    const orderId = document.getElementById("orderId").value;
    const cartData = orderView.getCartData(); 

    if (cartData.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const totalVal = document.getElementById("finalTotal").value;
    const paymentData = {
        orderId: document.getElementById("orderId").value,
        // total: document.getElementById("finalTotal").value, 
        date: document.getElementById("orderDate").value,
        total: totalVal,
    };
    localStorage.setItem("pendingPayment", JSON.stringify(paymentData));

    console.log("Saved to Storage before reset:", paymentData);

    alert("Order placed successfully! ID: " + orderId);
    orderView.resetOrderForm();
    loadInitialData(); 

    window.location.href = "payment.html";
});

    setupNavigation();
});


function loadInitialData() {
    document.getElementById('orderDate').valueAsDate = new Date();
    
    const nextOrderId = orderModel.generateNextOrderId();
    document.getElementById("orderId").value = nextOrderId;

    fillCustomerDropdown();
    fillItemDropdown();
}

function fillCustomerDropdown() {
    const custSelect = document.getElementById("custId");
    const customers = customerModel.getAllCustomers();
    custSelect.innerHTML = '<option value="" disabled selected>Select Customer ID</option>';
    customers.forEach(c => {
        custSelect.innerHTML += `<option value="${c.id}">${c.id}</option>`;
    });
}

function fillItemDropdown() {
    const itemSelect = document.getElementById("itemId");
    const items = itemModel.getAllItems();
    itemSelect.innerHTML = '<option value="" disabled selected>Select Item ID</option>';
    items.forEach(i => {
        itemSelect.innerHTML += `<option value="${i.code}">${i.code}</option>`;
    });
}

function clearItemFields() {
    document.getElementById("itemId").value = "";
    document.getElementById("itemName").value = "";
    document.getElementById("unitPrice").value = "";
    document.getElementById("qtyOnHand").value = "";
    document.getElementById("orderQty").value = "";
}

function clearCustomerFields(){
    document.getElementById("custId").value = "";
    document.getElementById("custName").value = "";
    document.getElementById("custAddress").value = "";
}

function setupNavigation() {
    const navigate = (page) => window.location.href = page;
    document.getElementById("navDashboard")?.addEventListener("click", () => navigate('dashboard.html'));
    document.getElementById("navCustomer")?.addEventListener("click", () => navigate('customer.html'));
    document.getElementById("navStock")?.addEventListener("click", () => navigate('item.html'));
    document.getElementById("navProduct")?.addEventListener("click", () => navigate('productRange.html'));
    document.getElementById("navReport")?.addEventListener("click", () => navigate('report.html'));
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btnGlobe")?.addEventListener("click", () => {
        alert("Language selection is coming soon! (Sinhala / English)");
        
        window.location.href = "setting.html";
    });

    document.getElementById("btnSetting")?.addEventListener("click", () => {
        window.location.href = "setting.html"; 
    });

    document.getElementById("btnLogout")?.addEventListener("click", () => {
        const isConfirm = confirm("Do you want to logout?");
        
        if (isConfirm) {
            localStorage.clear();
            sessionStorage.clear();

            window.location.href = "login.html"; 
        }
    });

});

document.getElementById("btnResetOrder")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the entire order?")) {
        
        orderView.resetOrderForm();
        
        const nextId = orderModel.generateNextOrderId();
        document.getElementById("orderId").value = nextId;
        document.getElementById('orderDate').valueAsDate = new Date();
       
        clearItemFields();
        clearCustomerFields();
    }
});
