const express = require("express");
const app = express();
// const PORT = 8080;

app.use(express.json());

const books = [
    {
        id: 1,
        title: "1984",
        author: "George Orwell",
        available: true
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        available: true
    }
]

app.get('/books', (req, res) => {
    if(books.length === 0)
    {
        // books = [];
        return res.status(404).json(books);
    }
    return res.status(200).json(books);
})

app.post('/books', (req, res) => {
    const { title, author, available} = req.body;

    if(typeof title !== 'string' || typeof author !== 'string' || typeof available !== 'boolean' || available === undefined || available === null || !title || !author)
    {
        return res.status(400).json("Invalid input");
    }

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;
    const newBook = { id: newId, title, author, available };
    books.push(newBook);
    return res.status(201).json(newBook);
})

app.delete('/books/:id', (req, res) => {
    const deleteId = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === deleteId);
    if(index === -1)
    {
        return res.status(404).json("Book not found")
    }
    const deletedBook = books.splice(index, 1)[0];
    return res.status(200).json(deletedBook);
})

app.patch('/books', (req, res) => {
    return res.status(405).json({ message: "Method Not Allowed" })
})

app.all('/books', (req, res) => {
    return res.status(405).json({ message: "Method Not Allowed" })   //should be at last
})

app.all('*', (req, res) => {
    return res.status(404).json({ message: "Not Found" })        //should be at last
})

app.use((req, res) => {
    return res.status(404).json({ message: "Not Found" })        //Middleware for 404
})

app.listen(PORT, () => {
    console.log(`Connected to port : ${PORT}`);
})