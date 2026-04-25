let cartItems = [];

export const orderView = {
    
    appendToTable: function(item) {
        const tableBody = document.querySelector('#orderTable tbody');
        
        cartItems.push(item);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>${item.total.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);

        console.log("Current Cart Items:", cartItems);

        this.updateTotal(cartItems);
    },

    updateTotal: function(items) { 
        const itemList = items || [];
        let netTotal = 0;

        items.forEach(item => {
            netTotal += item.total;
        });

        console.log("Calculated Net Total:", netTotal);

        const totalField = document.getElementById('finalTotal');
        if (totalField) {
            totalField.value = netTotal.toFixed(2);
        }
    },
    resetOrderForm: function() {
        cartItems = [];
        const tableBody = document.querySelector('#orderTable tbody');
        if (tableBody) tableBody.innerHTML = "";
        
        const totalField = document.getElementById('finalTotal');
        if (totalField) totalField.value = "0.00";
    },

    getCartData: function() {
        return cartItems; 
    }
};