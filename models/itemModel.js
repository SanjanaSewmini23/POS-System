import { db } from '../db/db.js';


export const itemModel = {
    // get all items
    getAllItems: () => {
        return db.items;
    },

    // add new item
    addItem: function(code, name, qty, price) {
        const newItem = { 
            code, 
            name, 
            qty: parseInt(qty), 
            price: parseFloat(price) 
        };
         db.items.push(newItem);
        return newItem;
    },

    // search item
    searchItem: (code) => {
        return db.items.find(item => item.code === code);
    },

    // update item
    updateItem: (code, updatedData) => {
        const index = db.items.findIndex(item => item.code === code);
        if (index !== -1) {
            db.items[index] = { code, ...updatedData };
            return true;
        }
        return false;
    },

    // delete item
    deleteItem: (code) => {
        const index = db.items.findIndex(item => item.code === code);
        if (index !== -1) {
            db.items.splice(index, 1);
            return true;
        }
        return false;
    },

    // generate new item id
    generateNextCode: () => {
        const items = db.items;
        
        if (items.length === 0) {
            return "I001";
        }

        const lastCode = items[items.length - 1].code;
        
        const lastNumber = parseInt(lastCode.substring(1));
        
        const nextNumber = lastNumber + 1;
        return "I" + nextNumber.toString().padStart(3, '0');
    }
};