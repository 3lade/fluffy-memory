import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div>
      <h1>Book Rental Management System</h1>
      <Link to='/add' style={{marginRight: '1rem'}}>Add New Rental</Link>
      <Link to='/rentals'>View Rentals</Link>
    </div>
  )
}

export default Header