import { productModel } from '../models/productModel.js';
import { productView } from '../views/productView.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const categorySelect = document.getElementById("category");
    const productCards = document.querySelectorAll(".product-card");

    categorySelect?.addEventListener("change", (e) => {
        const selectedCategory = e.target.value;

        productCards.forEach(card => {
            if (selectedCategory === "" || card.getAttribute("data-category") === selectedCategory) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    const navigateTo = (page) => {
        window.location.href = page;
    };

    document.getElementById("navDashboard")?.addEventListener("click", () => navigateTo('dashboard.html'));
    document.getElementById("navCustomer")?.addEventListener("click", () => navigateTo('customer.html'));
    document.getElementById("navStock")?.addEventListener("click", () => navigateTo('item.html'));
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