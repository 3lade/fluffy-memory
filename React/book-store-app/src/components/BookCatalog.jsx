import React, { useState } from 'react'
import { bookData } from '../data/books'
import BookItem from './BookItem'
import './BookCatalog.css'


function BookCatalog() {

  const [sortData, SetSortData] = useState(bookData)
  const [isAscending, SetAscending] = useState(true)

  function sorting () {
    const sorted = [...sortData].sort((a, b) => 
          isAscending ? a.price - b.price : b.price - a.price)
    SetSortData(sorted)
    SetAscending(!isAscending)
  }
  
  return (
    <div>
    <h2>Discounted Bookstore</h2>
      <button onClick={sorting}>Sort by Price ({isAscending ? 'Low to High' : 'High to Low'})</button>
    <div className='container'>
            {
              sortData.map((book, key) => (
                <BookItem book={book} key={book.id}/>
              ))
            }
    </div>
    </div>
  )
}

export default BookCatalog