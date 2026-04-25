export const productModel = {
    filterProducts: function(allProducts, selectedCategory) {
        return Array.from(allProducts).filter(product => {
            return selectedCategory === "" || product.dataset.category === selectedCategory;
        });
    }
};