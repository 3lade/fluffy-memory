//connect using mongodb://localhost:27017/bookapp
//use mongosh in terminal to check if the database is created
//db.books.find().pretty() to see the data in the collection   

const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedYear: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    
})

module.exports = mongoose.model('Book', booksSchema);