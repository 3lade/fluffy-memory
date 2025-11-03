import React, { useState } from 'react'

function MovieForm({addMovie}) {
    const [inputValue, setInputValue] = useState({
        title: "",
        director: "",
        releaseDate: "",
        status: "",
        rating: "",
        comments: ""
    })
    const [errors, setErrors] = useState({})
    const [globalError, setGlobalError] = useState("")

    const validate = () => {
        const newError = {};

        if(!inputValue.title) newError.title = "Movie title is required"
        if(!inputValue.releaseDate) newError.releaseDate = "Release date is required"
        if(!inputValue.status) newError.status = "Status is required"
        if(inputValue.rating && (inputValue.rating < 1 || inputValue.rating > 10))
        {
            newError.rating = "Rating must be between 1-10"
        }

        setErrors(newError)

        return Object.keys(newError).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validate())
        {
            setGlobalError("Please complete all required fields.")
            return;
        }

        addMovie({
            title: '',
            director: inputValue.director.trim(),
            releaseDate: inputValue.releaseDate,
            status: inputValue.status,
            rating: inputValue.rating,
            comments: inputValue.comments.trim()
        })

        setInputValue({
            title: "",
            director: "",
            releaseDate: "",
            status: "",
            rating: "",
            comments: ""
        })

        setErrors({})
        setGlobalError("");

    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputValue(prevState => ({...prevState, [name]: value}))

        if(errors[name])
        {
            setErrors(prevState => ({...prevState, [name]: ""}))
        }

        if(globalError)
        {
            setGlobalError('');
        }
    }


  return (
    <div>
        {globalError && <p className='global-error'>{globalError}</p>}

        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="title">Movie Title*</label>
            <input type="text" 
                id='title'
                name='title'
                placeholder='Enter movie title'
                value={inputValue.title}
                onChange={handleChange}
                aria-invalid = {errors.title ? 'true' : 'false'}
            />
            {errors.title && <div className='error'>{errors.title}</div>}

            <label htmlFor="director">Director Name</label>
            <input type="text" 
                id='director'
                name='director'
                placeholder="Enter director’s name (optional)"
                value={inputValue.director}
                onChange={handleChange}    
            />

            <label htmlFor="releaseDate">Release Date*</label>
            <input type="date" 
                id='releaseDate'
                name='releaseDate'
                value={inputValue.releaseDate}
                onChange={handleChange}
                aria-invalid = {errors.releaseDate ? 'true' : 'false'}
            />
            {errors.releaseDate && <div className='error'>{errors.releaseDate}</div>}

            <label htmlFor="status">Status*</label>
            <select name="status" id="status"
                value={inputValue.status}
                onChange={handleChange}
                aria-invalid = {errors.status ? 'true' : 'false'}
            >
                <option value="">Select status</option>
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Watched">Watched</option>
            </select>
            {errors.status && <div className='error'>{errors.status}</div>}

            <label htmlFor="rating">Your Rating</label>
            <input type="number"
                id='rating'
                name='rating'
                placeholder='1-10 (optioanl)'
                min="1"
                max="10"
                value={inputValue.rating}
                onChange={handleChange}  
            />

            <label htmlFor="comments">Comments</label>
            <textarea id="comments" name="comments" cols="30" rows="10"
                placeholder='Add personal comments (optional)'
                value={inputValue.comments}
                onChange={handleChange}
            ></textarea>

            <button type='submit' className='submit-btn'>Add to Watchlist</button>
        </form>
    </div>
  )
}

export default MovieForm