const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: 2,
        maxlength: 25
    },
    category: {
        type: String,
        required: [true, 'category is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
        min: [0, 'price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'description is required'],
        minlength: [5, 'Please describe more']
    },
    inStock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'stock should not be less than 0']
    }
})

module.exports = mongoose.model('Product', productSchema);