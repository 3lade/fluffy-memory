import React, { useState } from 'react'
import './App.css'
import MovieForm from './components/MovieForm'
import Filter from './components/Filter'
import MovieList from './components/MovieList'

function App() {
  
  const [movies, setMovies] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')

  const addMovie = (movie) => {
    setMovies(prevStatus => [...prevStatus, movie])
  }

  const removeMovie = (index) => {
    setMovies(prevStatus => prevStatus.filter(movie => movie.id !== index))
  }

  const getSummary = () => {
    const total = movies.length;
    const planToWatch = movies.filter(m => m.status === 'Plan to Watch').length
    const watching = movies.filter(m => m.status === 'Watching').length
    const watched = movies.filter(m => m.status === 'Watched').length

    return <p>Total Movies: {total} | Plan to Watch: {planToWatch} | Watching: {watching} | Watched: {watched}</p>
  }

  return (
    <>
      <div className='container'>
        <h1>Movie Watchlist Manager</h1>
        <div>{getSummary()}</div>
        <MovieForm addMovie={addMovie}/>
        <Filter 
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <MovieList
          movies={movies}
          removeMovie={removeMovie}
          filterStatus={filterStatus}
        />
      </div>
    </>
  )
}

export default App