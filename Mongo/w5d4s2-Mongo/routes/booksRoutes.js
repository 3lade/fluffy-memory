const express = require('express');
const { getAllBooks, createBook, updateAllBooks, getBookById, deleteBook, updateById } = require('../controllers/booksControllers');
const validateBooks = require('../middleware/inputValidation');
const routes = express.Router();

//get all Books
routes.get('/', getAllBooks);

//get books by id
routes.get('/:_id', getBookById);

//create new book
routes.post('/', validateBooks, createBook);

//update the book
routes.put('/', updateAllBooks)

//update the book by title
routes.patch('/:_id', updateById)

//delete the book
routes.delete('/:_id', deleteBook)

routes.all('*', (req, res) => {
    return res.status(400).json({error: "Router not defined"});
})

module.exports = routes;