import { itemModel } from '../models/itemModel.js';
import { itemView } from '../views/itemView.js';

function updateNextCode() {
    const nextCode = itemModel.generateNextCode();
    itemView.setNextCode(nextCode);
}

function refreshTable() {
    itemView.clearTable(); 
    const allItems = itemModel.getAllItems(); 
    allItems.forEach(item => itemView.renderNewItem(item));
}

function handleSaveStock() {
    const data = itemView.getInputs();

    if (!data.code || !data.name || !data.qty || !data.price) {
        itemView.showAlert("Please fill all fields!");
        return;
    }

    const newItem = itemModel.addItem(data.code, data.name, data.qty, data.price);

    itemView.renderNewItem(newItem);
    itemView.resetForm();
    
    updateNextCode();
    alert("Item Saved Successfully!");
}

document.addEventListener("DOMContentLoaded", () => {
    
    refreshTable();
    updateNextCode();

    document.getElementById("btnSaveStock")?.addEventListener("click", handleSaveStock);

    document.getElementById("btnUpdateStock")?.addEventListener("click", () => {
        const data = itemView.getInputs();
        const isUpdated = itemModel.updateItem(data.code, { 
            name: data.name, 
            qty: data.qty, 
            price: data.price 
        });

        if (isUpdated) {
            refreshTable();
            itemView.resetForm();
            updateNextCode();
            alert("Item Updated!");
        } else {
            alert("Update Failed!");
        }
    });

    document.getElementById("btnDeleteStock")?.addEventListener("click", () => {
        const code = document.getElementById("itemCode").value;
        const isDeleted = itemModel.deleteItem(code);

        if (isDeleted) {
            refreshTable();
            itemView.resetForm();
            updateNextCode();
            alert("Item Deleted!");
        } else {
            alert("Item not found!");
        }
    });

    document.getElementById("btnResetStock")?.addEventListener("click", () => {
        itemView.resetForm();
        updateNextCode();
    });

    const searchInput = document.querySelector(".search-bar input");
    searchInput?.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const code = searchInput.value.trim().toUpperCase(); 
        
        const item = itemModel.searchItem(code);

        if (item) {
            itemView.displayItemDetails(item); 
            searchInput.value = ""; 
        } else {
            itemView.showAlert("Item not found with code: " + code);
        }
        }
    });

    const navigateTo = (page) => window.location.href = page;

    document.getElementById("navDashboard")?.addEventListener("click", () => navigateTo('dashboard.html'));
    document.getElementById("navProduct")?.addEventListener("click", () => navigateTo('productRange.html'));
    document.getElementById("navCustomer")?.addEventListener("click", () => navigateTo('customer.html'));
    document.getElementById("navOrder")?.addEventListener("click", () => navigateTo('order.html'));
    document.getElementById("navReport")?.addEventListener("click", () => navigateTo('report.html'));
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