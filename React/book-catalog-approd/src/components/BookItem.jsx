import React from 'react'

function BookItem({book, deleteBook, toggleFavorite}) {


  return (
    <div>
        <h2>{book.title}
        {book.favorite && <span>*</span>}
        </h2>
        <p>Author: </p>
        <p>{book.author}</p>
        <p>Genre: </p>
        <p>{book.genre || 'N/A'}</p>
        <button onClick={() => toggleFavorite(book.id)}>{book.favorite ? 'Unmark Favorite' : 'Mark Favorite'}</button>
        
        <button onClick={() => deleteBook(book.id)}>Delete</button>
    </div>
  )
}

export default BookItem