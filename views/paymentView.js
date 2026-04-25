export const paymentView = {
    displayAmounts: function(total, subTotal) {
        const totalField = document.getElementById("pTotal");
        const subTotalField = document.getElementById("pSubTotal");
        const balanceField = document.getElementById("pBalance");

        if (totalField) totalField.value = total.toFixed(2);
        if (subTotalField) subTotalField.value = subTotal.toFixed(2);
        if (balanceField) balanceField.value = subTotal.toFixed(2);
    },

    getInputs: function() {
        return {
            total: parseFloat(document.getElementById("pTotal").value) || 0,
            discount: parseFloat(document.getElementById("pDiscount").value) || 0
        };
    },

    showAlert: function(message) {
        alert(message);
    }
};