import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../modules/books/redux/bookSlice'
import { Link } from 'react-router-dom'

function BookPage() {

    const {loading, bookItems} = useSelector(state => state.books)
    const dispatch = useDispatch()

    useEffect(()=> {
     dispatch(getBooks())   
    }, [dispatch])
  return (
    <div>
        <h2>Book List</h2>
        <Link to='/add'>
        Add Book
        </Link>
        {/* {
        [
            <p>Hello World</p>,
            <p>Hello World2</p>
        ]
        } */}
        {
            loading ? (
                <p>Loading...</p>
            ) : (
                bookItems.map((book) => (
                    <div key={book.id}>
                        <p>{book.title} - {book.author} - {book.genre} - {book.price} - {book.quantity}</p>
                        <Link to={`/edit/${book.id}`}>
                        <button>Edit</button>
                        </Link>
                    </div>
                ))
            )
        }
    </div>
  )
}

export default BookPage