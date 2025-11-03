import React from 'react'
import './MovieCard.css'

function MovieCard(item) {
  return (
    <div>
        <div className='card'>
            <h1>{item.title}</h1>
            <img src={item.image} alt="imageLoading" style={{maxWidth: 150, maxHeight: 150}}/>
            <p>{item.description}</p>
            <p>Rating: {item.rating}</p>
            
        </div>
    </div>
  )
}

export default MovieCard