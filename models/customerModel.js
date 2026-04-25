import { db } from '../db/db.js';

export const customerModel = {

    getAllCustomers: () => {
        return db.customers;
    },

    addCustomer: (id, name, address) => {
        const newCustomer = { id, name, address };
        db.customers.push(newCustomer);
        return newCustomer;
    },

    searchCustomer: (id) => {
        return db.customers.find(customer => customer.id === id);
    },

    updateCustomer: (id, updatedData) => {
        const index = db.customers.findIndex(customer => customer.id === id);
        if (index !== -1) {
            db.customers[index] = { id, ...updatedData };
            return true;
        }
        return false;
    },

    deleteCustomer: (id) => {
        const index = db.customers.findIndex(customer => customer.id === id);
        if (index !== -1) {
            db.customers.splice(index, 1);
            return true;
        }
        return false;
    },

    generateNextId: () => {
        const customers = db.customers;
        if (customers.length === 0) {
            return "C001"; 
        }

        const lastId = customers[customers.length - 1].id; 
        
        const lastNumber = parseInt(lastId.substring(1));
        
        const nextNumber = lastNumber + 1;
        return "C" + nextNumber.toString().padStart(3, '0');
    }
};