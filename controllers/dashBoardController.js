import { dashboardView } from '../views/dashboardView.js';
import { customerModel } from '../models/customerModel.js';
import { itemModel } from '../models/itemModel.js';
import {orderModel } from '../models/orderModel.js';
const navigateTo = (page) => {
    window.location.href = page;
};

document.getElementById("navDashboard")?.addEventListener("click", () => navigateTo('dashboard.html'));
document.getElementById("navProduct")?.addEventListener("click", () => navigateTo('productRange.html'));
document.getElementById("navCustomer")?.addEventListener("click", () => navigateTo('customer.html'));
document.getElementById("navStock")?.addEventListener("click", () => navigateTo('item.html'));
document.getElementById("navOrder")?.addEventListener("click", () => navigateTo('order.html'));
document.getElementById("navReport")?.addEventListener("click", () => navigateTo('report.html'));

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

    const customers = customerModel.getAllCustomers();
    document.getElementById("customerCount").innerText = customers.length;

    const items = itemModel.getAllItems();
    document.getElementById("stockCount").innerText = items.length;

    const orders = orderModel.getAllOrders();
    document.getElementById("orderCount").innerText = orders.length;

});

const slider = document.getElementById("slider");

document.getElementById("btnPrev")?.addEventListener("click", () => {
    slider.scrollBy({ left: -200, behavior: 'smooth' });
});

document.getElementById("btnNext")?.addEventListener("click", () => {
    slider.scrollBy({ left: 200, behavior: 'smooth' });
});