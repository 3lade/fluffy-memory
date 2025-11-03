import React from 'react'

function Footer() {
    const year = new Date().getFullYear();
    console.log(year)
  return (
    <div>
        <p>&copy; {year} Neo Funtime</p>
    </div>
  )
}

export default Footer