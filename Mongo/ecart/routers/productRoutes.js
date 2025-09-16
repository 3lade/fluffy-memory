const express = require('express');
const { 
    addProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct, 
    searchFilterSortProducts
} = require('../controller/productController');

const productRoutes = express.Router();

// Add product
productRoutes.post('/', addProduct);

productRoutes.get('/search', searchFilterSortProducts);

// Get all products  
productRoutes.get('/', getAllProducts);

// Get product by ID
productRoutes.get('/:id', getProductById);

// Update product
productRoutes.put('/:id', updateProduct);

// Delete product
productRoutes.delete('/:id', deleteProduct);

module.exports = productRoutes;