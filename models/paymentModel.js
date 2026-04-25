export const paymentModel = {
    getPaymentData: function() {
        const data = localStorage.getItem("pendingPayment");
        return data ? JSON.parse(data) : null;
    },

    calculateDiscountedTotal: function(total, discountPercentage) {
        const discValue = parseFloat(discountPercentage) || 0;
        const discountAmount = (total * discValue) / 100;
        return total - discountAmount;
    },

    clearPaymentData: function() {
        localStorage.removeItem("pendingPayment");
    }
};