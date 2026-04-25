export const itemView = {
    getInputs: () => {
        return {
            code: document.getElementById("itemCode").value,
            name: document.getElementById("itemName").value,
            qty: document.getElementById("qty").value,
            price: document.getElementById("unitPrice").value
        };
    },

    renderNewItem: (item) => {
        const tableBody = document.querySelector("#stockTable tbody");

        if (tableBody) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${parseFloat(item.price).toFixed(2)}</td>
            `;
        } else {
            console.error("Table body (#stockTable tbody) not found!");
        }
    },

    setNextCode: (nextCode) => {
        const codeField = document.getElementById("itemCode");
        if (codeField) {
            codeField.value = nextCode;
            codeField.readOnly = true;
        }
    },

    resetForm: () => {
        document.getElementById("itemName").value = "";
        document.getElementById("qty").value = "";
        document.getElementById("unitPrice").value = "";
    },

    showAlert: (message) => {
        alert(message);
    },

    displayItemDetails: (item) => {
        if (item) {
            document.getElementById("itemCode").value = item.code;
            document.getElementById("itemName").value = item.name;
            document.getElementById("qty").value = item.qty;
            document.getElementById("unitPrice").value = item.price;
        }
    },

    // Update,Delete waladi table eka refresh kirima
    clearTable: () => {
        const tableBody = document.querySelector("#stockTable tbody");
        if (tableBody) {
            tableBody.innerHTML = "";
        }
    }
};