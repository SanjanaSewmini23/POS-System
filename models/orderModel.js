import { db } from '../db/db.js';

export const orderModel = {
        generateNextOrderId: () => {
        const orders = db.orders;
        
        if (!orders || orders.length === 0) {
            return "O001";
        }

        const lastOrder = orders[orders.length - 1];
        const lastId = lastOrder.orderId; 
        
        const lastNumber = parseInt(lastId.substring(1));
        const nextNumber = lastNumber + 1;
        
        return "O" + nextNumber.toString().padStart(3, '0');
    },

    placeOrder: function(orderData) {
        try {
            db.orders.push(orderData);
            orderData.items.forEach(orderItem => {
                const item = db.items.find(i => i.code === orderItem.itemCode);
                if (item) {
                    item.qty = parseInt(item.qty) - parseInt(orderItem.qty);
                }
            });
            return true;
        } catch (e) {
            return false;
        }
    },

    getAllOrders: () => {
        return db.orders;
    }
};