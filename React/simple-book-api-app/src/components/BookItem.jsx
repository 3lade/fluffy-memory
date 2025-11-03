import React from 'react'

function BookItem({book, onEdit, onRemove}) {
  return (
    <li>
        <div>
            <p>{book.name} -</p>
        </div>
        <div>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onRemove(book.id)}>Remove</button>
        </div>
    </li>
  )
}

export default BookItem