import { paymentModel } from '../models/paymentModel.js';
import { paymentView } from '../views/paymentView.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const paymentData = paymentModel.getPaymentData();

    if (paymentData) {
        const orderIdField = document.getElementById("pId");
        const dateField = document.getElementById("date");
        
        if (orderIdField) orderIdField.value = paymentData.orderId;
        if (dateField) dateField.value = paymentData.date;

        const total = parseFloat(paymentData.total) || 0;
        paymentView.displayAmounts(total, total);
        
        console.log("Payment details loaded for Order:", paymentData.orderId);
    } else {
        console.error("No pending payment data found!");
    }
    
    const discountInput = document.getElementById("pDiscount");
    discountInput?.addEventListener("input", () => {
        const inputs = paymentView.getInputs();
        const finalAmount = paymentModel.calculateDiscountedTotal(inputs.total, inputs.discount);
        paymentView.displayAmounts(inputs.total, finalAmount);
    });

    document.getElementById("btnPurchase")?.addEventListener("click", () => {
        paymentView.showAlert("Purchase successful for S&S Bakery & Pastries!");
        paymentModel.clearPaymentData();
        window.location.href = 'dashboard.html';
    });

    document.getElementById("btnPrintReceipt")?.addEventListener("click", () => {
        window.print();
    });

    setupNavigation();
});

function setupNavigation() {
    const navigate = (page) => window.location.href = page;
    document.getElementById("navDashboard")?.addEventListener("click", () => navigate('dashboard.html'));
    document.getElementById("navCustomer")?.addEventListener("click", () => navigate('customer.html'));
    document.getElementById("navStock")?.addEventListener("click", () => navigate('item.html'));
    document.getElementById("navOrder")?.addEventListener("click", () => navigate('order.html'));
    document.getElementById("btnLogout")?.addEventListener("click", () => {
        if (confirm("Do you want to logout?")) {
            localStorage.clear();
            window.location.href = "login.html"; 
        }
    });
}