import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
  return (
    <div>
        <p>&copy; {year} Neo Movies</p>
    </div>
  )
}

export default Footer