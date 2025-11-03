import React from 'react'
import './BookItem.css'

function BookItem({book}) {
  return (
    <>
    <div className='card'>
        <img src={book.image} alt='loading failed maybe' style={{maxWidth: 180, maxHeight: 250}}/>
        <h3>{book.title}</h3>
        <p>By {book.author}</p>
        <p>₹{book.price}</p>
    </div>
    </>
  )
}

export default BookItem