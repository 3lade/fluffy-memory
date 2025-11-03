import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <Link to='/add'>Add New Rental</Link>
        <Link to='/rentals'>View Rentals</Link>
    </div>
  )
}

export default Header