import React, { useState } from 'react'

function BookReviewSubmissionForm() {

    const [inputValue, setInputValue] = useState({
        title: "",
        author: "",
        rating: "",
        comments: ""
    })
    const [errors, setErrors] = useState({})
    const [successMsg, setSuccessMsg] = useState("")

    const validation = () => {
        const newError = {}
        if(!inputValue.title) newError.title = "Book title is required"
        if(!inputValue.author) newError.author = "Author is required"
        if(!inputValue.comments) newError.comments = "Comments are required"
        if(!inputValue.rating) {
            newError.rating = "Rating is required"
        } else {
            const numRating = parseInt(inputValue.rating)
            if(isNaN(numRating) || numRating < 1 || numRating > 5) {
                newError.rating = "Rating must be between 1 and 5"
            }
        }

        setErrors(newError)
        return Object.keys(newError).length === 0;
    }
    
    const handleSubmit = (e) => {

        e.preventDefault();

        setSuccessMsg('')
        if(validation()) {
            setSuccessMsg("Review submitted successfully")
            setInputValue({
                title: "",
                author: "",
                rating: "",
                comments: ""
            })

            setTimeout(() => {
                setSuccessMsg('');
            }, 2000)
        }
    }

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInputValue((prevState) => (
            {...prevState, [name]: value}
        ))

        setErrors((prevState) => (
            {...prevState, [name]: ""}
        ))
    }


  return (
    <div>
        <h1>Book Review Submission Form</h1>
        <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="titleValue">Book Title:</label>
            <input type="text" 
                id='authorValue'
                name='title'
                value={inputValue.title}
                onChange={handleInput}
                size={60}
            />
            <p className='error'>{errors.title}</p>

            <label htmlFor="authorValue">Author:</label>
            <input type="text" 
                id='authorValue'
                name='author'
                value={inputValue.author}
                onChange={handleInput}
                size={60}
            />
            <p className='error'>{errors.author}</p>

            <label htmlFor="ratingValue">Rating (1-5):</label>
            <input type="text" 
                id='ratingValue'
                name='rating'
                value={inputValue.rating}
                onChange={handleInput}
                size={60}
            />
            <p className='error'>{errors.rating}</p>

            <label htmlFor="commentsValue">Comments:</label>
            <input type="text" 
                id='commentsValue'
                name='comments'
                value={inputValue.comments}
                onChange={handleInput}
                size={60}
            />
            <p className='error'>{errors.comments}</p>

            <button type='submit' className='ReviewButton'>Submit Review</button>

            <p className='success'>{successMsg}</p>
        </form>
    </div>
  )
}

export default BookReviewSubmissionForm