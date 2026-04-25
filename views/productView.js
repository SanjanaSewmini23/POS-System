export const productView = {
    getSelectedCategory: function() {
        return document.getElementById("category").value;
    },

    getAllProductElements: function() {
        return document.querySelectorAll(".product-card");
    },

    updateProductDisplay: function(allProducts, visibleProducts) {
        allProducts.forEach(product => {
            if (visibleProducts.includes(product)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    }
};