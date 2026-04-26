export const customerView = {
    // input fields walin data ganima
    getInputs: () => {
        return {
            id: document.getElementById("custId").value,
            name: document.getElementById("custName").value,
            address: document.getElementById("custAddress").value
        };
    },

    // addd new item to table
    renderNewCustomer: (customer) => {
        const tableBody = document.querySelector("#customerTable tbody");

        if (tableBody) {
            const row = tableBody.insertRow();
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.address}</td>
            `;
        } else {
            console.error("Table body (#customerTable tbody) not found!");
        }
    },

    setNextId: (nextId) => {
        const idField = document.getElementById("custId");
        if (idField) {
            idField.value = nextId;
            idField.readOnly = true; 
        }
    },

    resetForm: () => {
        document.getElementById("custName").value = "";
        document.getElementById("custAddress").value = "";
    },

    showAlert: (message) => {
        alert(message);
    },

    //search customer
    displayCustomerDetails: (customer) => {
        if (customer) {
            document.getElementById("custId").value = customer.id;
            document.getElementById("custName").value = customer.name;
            document.getElementById("custAddress").value = customer.address;
        }
    },

    //update,delete waladi table eka refresh karala clear kirima
    clearTable: () => {
        const tableBody = document.querySelector("#customerTable tbody");
        if (tableBody) {
            tableBody.innerHTML = "";
        }
    }
};
