const Book = require('../models/Book');

const getAllBooks = async (req, res) => {

    try {
        const books = await Book.find({});
        return res.status(200).json({books});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const saveBook = await book.save();
        return res.status(201).json({message: "Book created successfully", book: saveBook});
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

const updateAllBooks = async (req, res) => {
    try {
        const updatedBooks = await Book.updateMany({}, {$set: req.body});
        return res.status(200).json({message: "All books updated successfully", result:updatedBooks})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

const getBookById = async (req, res) => {
    try{
        const foundBook = await Book.findById(req.params._id);
        if(!foundBook)
        {
            return res.status(400).json({error: "Book not found"});
        }
        return res.status(200).json({book: foundBook})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }

}

const updateById = async (req, res) => {
    try{
        const updateBookTitle = await Book.updateBookTitle(req.params._id);
        if(!updateBookTitle)
        {
            return res.status(400).json({error: "Book not found"});
        }
        return res.status(200).json({message: "Updated book by id Successfully",book: updateBookTitle})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteBook = async (req, res) => {
    try{
        const delBook = await Book.findByIdAndDelete(req.params._id);
        if(!delBook)
        {
            return res.status(400).json({error: "Book not found"});
        }
        return res.status(200).json({message: "Deleted book Successfully",book: delBook})
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
}


module.exports = {
    getAllBooks,
    createBook,
    updateAllBooks,
    getBookById,
    updateById,
    deleteBook
}