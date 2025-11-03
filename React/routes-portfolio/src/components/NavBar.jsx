import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <div>
            <nav>
                <h1>Portfolio</h1>
                <div>
                    <Link to='/'>Home</Link>
                    <Link to='/projects'>Projects</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
            </nav>
        </div>
    </div>
  )
}

export default NavBar