import React, { useState } from 'react'
import {movieData} from './MovieData'
import MovieCard from './MovieCard';
import './MovieCard.css'


function MovieList() {

  const [sortMovie, setMovieData] = useState(movieData)

  const sorting = () => {
    const sorted = [...sortMovie].sort((a, b) => a.rating - b.rating)
    // console.log(sortMovie)
    setMovieData(sorted)
  }

  return (
    <div>
        <h1>Movie List</h1>
        <button onClick={sorting}>Sort by rating</button>
        <div className='container'>
            {
                sortMovie.map((item, key) => (
                    <MovieCard {...item}/>
                    // <MovieCard data={item} key={item.id}/>
                ))
            }
        </div>

    </div>
  )
}

export default MovieList