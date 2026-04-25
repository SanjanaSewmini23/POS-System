import { customerModel } from '../models/customerModel.js';
import { customerView } from '../views/customerView.js';

// next customer id
function updateNextId() {
    const nextId = customerModel.generateNextId();
    customerView.setNextId(nextId);
}

// add customer
function handleAddCustomer() {
    const data = customerView.getInputs();

    //check valid data
    if (!data.id || !data.name || !data.address) {
        customerView.showAlert("Please fill all fields!");
        return;
    }

    const newCustomer = customerModel.addCustomer(data.id, data.name, data.address);
    customerView.renderNewCustomer(newCustomer);  
    customerView.resetForm();

    updateNextId();
}

function refreshTable() {
    customerView.clearTable(); 
    const allCustomers = customerModel.getAllCustomers(); 
    allCustomers.forEach(cust => customerView.renderNewCustomer(cust)); 
}


document.addEventListener("DOMContentLoaded", () => {
    
    const allCustomers = customerModel.getAllCustomers();
    allCustomers.forEach(cust => customerView.renderNewCustomer(cust));

    updateNextId();

    document.getElementById("btnAddCustomer")?.addEventListener("click", handleAddCustomer);
    alert("Customer Saved!");
    
    document.getElementById("btnUpdate")?.addEventListener("click", () => {
    const data = customerView.getInputs();
    const isUpdated = customerModel.updateCustomer(data.id, { name: data.name, address: data.address });
    
    if (isUpdated) {
        refreshTable();
        customerView.resetForm();
        updateNextId();
        alert("Customer Updated!");
    } else {
        alert("Update Failed!");
    }
});

// Delete Button
document.getElementById("btnDelete")?.addEventListener("click", () => {
    const id = document.getElementById("custId").value;
    const isDeleted = customerModel.deleteCustomer(id);
    
    if (isDeleted) {
        refreshTable(); 
        customerView.resetForm();
        updateNextId();
        alert("Customer Deleted!");
    } else {
        alert("Customer not found!");
    }
});

    // Reset button
    document.getElementById("btnReset")?.addEventListener("click", () => {
        customerView.resetForm();
        updateNextId(); 
    });

    //search customer
    const searchInput = document.querySelector(".search-bar input"); // Search input එක තෝරා ගැනීම

    searchInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const id = searchInput.value.trim(); // ටයිප් කරපු ID එක ගැනීම
            
            const customer = customerModel.searchCustomer(id); // Model එකෙන් සොයා ගැනීම

            if (customer) {
                customerView.displayCustomerDetails(customer);
            } else {
                customerView.showAlert("Customer not found!");
            }
        }
    });

    // page navigation
    const navigate = (page) => window.location.href = page;

    document.getElementById("navDashboard")?.addEventListener("click", () => navigate('dashboard.html'));
    document.getElementById("navProduct")?.addEventListener("click", () => navigate('productRange.html'));
    document.getElementById("navStock")?.addEventListener("click", () => navigate('item.html'));
    document.getElementById("navOrder")?.addEventListener("click", () => navigate('order.html'));
    document.getElementById("navReport")?.addEventListener("click", () => navigate('report.html'));
});

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