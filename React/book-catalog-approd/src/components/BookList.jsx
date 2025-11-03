import React, { useState } from 'react'
import BookForm from './BookForm';
import BookItem from './BookItem';

function BookList() {
    const [books, setBooks] = useState([]);
    const [showFavOnly, setShowFavOnly] = useState(false)

    const addBook = (newBook) => {
      setBooks((prevState) => [...prevState, newBook])
    }

    const deleteBook = (id) => {
      setBooks((prevState) => prevState.filter(book => book.id !== id))
    }

    const toggleFavorite = (id) => {
      setBooks((prevState) => 
        prevState.map((book) => 
            book.id === id ? {...book, favorite: !book.favorite} : book))
    }

    const toggleFavView = () => {
      setShowFavOnly(prev => !prev)
    }

    const filteredBooks = showFavOnly
              ? books.filter(book => book.favorite)
              : books;

  return (
    <div>
        <h1>Book Catalog</h1>
        <BookForm addBook={addBook} toggleFavView={toggleFavView} showFavOnly={showFavOnly}/>
        {
            filteredBooks.map(book =>  (
              <BookItem  
                book={book} 
                key={book.id} 
                deleteBook = {deleteBook} 
                toggleFavorite={toggleFavorite}
          />))
        }
    </div>
  )
}

export default BookList