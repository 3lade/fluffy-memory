import React, { useContext, useState } from 'react'
import { BookContext } from './BookContext'
import BookItem from './BookItem';

function BookApp() {

    const {books, setBooks} = useContext(BookContext)

    const [bookName, setBookName] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [editing, setEditing] = useState(null)

    const handleAddBook = () => {
        if(bookName && quantity)
        {
            if(editing) {
                setBooks(
                    books.map((book) => (
                        book.id === editing.id ? {...book, name: bookName, quantity} : book
                    ))
                )
                setEditing(null)
            } else {
                const newBook = {
                    id: Date.now().toString(),
                    name: bookName,
                    quantity: quantity
                }
                setBooks([...books, newBook])
            }
        }
        setBookName('')
        setQuantity(quantity > 0 ? quantity : 1)

    }

    const handleEditBook = (book) => {
        setEditing(book)
        setBookName(book.name)
        setQuantity(book.quantity)
    }

    // const handleSaveEdit = () => {

    // }

    const handleRemoveBook =(id) => {
        const deleteBook = books.filter(book => book.id !== id)
        setBooks(deleteBook)
    }

    const totalBooks = books.length;
    const totalQuantity = books.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div>
        <h1>Book Invenory</h1>
        <div>
            <input type='text' 
                placeholder='Enter book name'
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                />
        </div>
        <div>
            <input type='number' 
                placeholder='Enter quantity'
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
        </div>
        <div>
            <button type="submit" onClick={handleAddBook}>{
                editing ? "Save Changes" : "Add New Book"
            }</button>
        </div>
        <div>
            <ul>
                {
                    books.map((book) => (
                        <BookItem
                            key={book.id}
                            book={book}
                            onEdit={handleEditBook}
                            onRemove={handleRemoveBook}
                        />
                    ))
                }
            </ul>
        </div>
        <div>
            <p>Total Books: {totalBooks}</p>
            <p>Total Quantity: {totalQuantity}</p>
        </div>
    </div>
  )
}

export default BookApp