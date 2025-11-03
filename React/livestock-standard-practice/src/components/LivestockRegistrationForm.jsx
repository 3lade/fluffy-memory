import React, { useState } from 'react'

function LivestockRegistrationForm() {

    const [inputValue, setInputValue] = useState({
        species: "",
        breed: "",
        age: "",
        healthStatus: ""
    })
    const [errors, setErrors] = useState({})
    const [successMsg, setSuccessMsg] = useState("")

    const validateForm = () => {
        const newError = {};
        if (!inputValue.species) newError.species = "Species is required"
        if (!inputValue.breed) newError.breed = "Breed is required"
        if (!inputValue.healthStatus) newError.healthStatus = "Health status is required"
        if (!inputValue.age) {
            newError.age = "Age is required"
        } else {
            const numAge = parseInt(inputValue.age)
            if (isNaN(numAge) || numAge < 0) {
                newError.age = "Invalid age"
            }
        }

        setErrors(newError)
        return Object.keys(newError).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMsg('');
        if (validateForm()) {
            setSuccessMsg("Livestock registered successfully!")
            setInputValue({
                species: "",
                breed: "",
                age: "",
                healthStatus: ""
            })
            setErrors({});
            setTimeout(()=> {
                setSuccessMsg('');
            }, 2000)
        }
    }

    const handleInputChange = (e) => {
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
            <h1>Livestock Registration Form</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="Species">Species:</label>
                <input type="text"
                    id='Species'
                    name='species'
                    value={inputValue.species}
                    onChange={handleInputChange}
                />
                <p>{errors.species}</p>

                <label htmlFor="Breed">Breed:</label>
                <input type="text"
                    id='Breed'
                    name='breed'
                    value={inputValue.breed}
                    onChange={handleInputChange}
                />
                <p>{errors.breed}</p>

                <label htmlFor="Age">Age:</label>
                <input type="text"
                    id='Age'
                    name='age'
                    value={inputValue.age}
                    onChange={handleInputChange}
                />
                <p>{errors.age}</p>

                <label htmlFor="Health">Health Status:</label>
                <input type="text"
                    id='Health'
                    name='healthStatus'
                    value={inputValue.healthStatus}
                    onChange={handleInputChange}
                />
                <p>{errors.healthStatus}</p>

                <button type='submit'>Register</button>
                <p>{successMsg}</p>
            </form>
        </div>
    )
}

export default LivestockRegistrationForm


//another similar problem

// import React, { useState } from 'react'

// function BookReviewSubmissionForm() {

//     const [inputValue, setInputValue] = useState({
//         title: "",
//         author: "",
//         rating: "",
//         comments: ""
//     })
//     const [errors, setErrors] = useState({})
//     const [successMsg, setSuccessMsg] = useState("")

//     const validation = () => {
//         const newError = {}
//         if(!inputValue.title) newError.title = "Book title is required"
//         if(!inputValue.author) newError.author = "Author is required"
//         if(!inputValue.comments) newError.comments = "Comments are required"
//         if(!inputValue.rating) {
//             newError.rating = "Rating is required"
//         } else {
//             const numRating = parseInt(inputValue.rating)
//             if(isNaN(numRating) || numRating < 1 || numRating > 5) {
//                 newError.rating = "Rating must be between 1 and 5"
//             }
//         }

//         setErrors(newError)
//         return Object.keys(newError).length === 0;
//     }
    
//     const handleSubmit = (e) => {

//         e.preventDefault();

//         setSuccessMsg('')
//         if(validation()) {
//             setSuccessMsg("Review submitted successfully")
//             setInputValue({
//                 title: "",
//                 author: "",
//                 rating: "",
//                 comments: ""
//             })

//             setTimeout(() => {
//                 setSuccessMsg('');
//             }, 2000)
//         }
//     }

//     const handleInput = (e) => {
//         const {name, value} = e.target;
//         setInputValue((prevState) => (
//             {...prevState, [name]: value}
//         ))

//         setErrors((prevState) => (
//             {...prevState, [name]: ""}
//         ))
//     }


//   return (
//     <div>
//         <h1>Book Review Submission Form</h1>
//         <form className='form' onSubmit={handleSubmit}>
//             <label htmlFor="titleValue">Book Title:</label>
//             <input type="text" 
//                 id='authorValue'
//                 name='title'
//                 value={inputValue.title}
//                 onChange={handleInput}
//             />
//             <p>{errors.title}</p>

//             <label htmlFor="authorValue">Author:</label>
//             <input type="text" 
//                 id='authorValue'
//                 name='author'
//                 value={inputValue.author}
//                 onChange={handleInput}
//             />
//             <p>{errors.author}</p>

//             <label htmlFor="ratingValue">Rating (1-5):</label>
//             <input type="text" 
//                 id='ratingValue'
//                 name='rating'
//                 value={inputValue.rating}
//                 onChange={handleInput}
//             />
//             <p>{errors.rating}</p>

//             <label htmlFor="commentsValue">Comments:</label>
//             <input type="text" 
//                 id='commentsValue'
//                 name='comments'
//                 value={inputValue.comments}
//                 onChange={handleInput}
//             />
//             <p>{errors.comments}</p>

//             <button type='submit'>Submit Review</button>

//             <p>{successMsg}</p>
//         </form>
//     </div>
//   )
// }

// export default BookReviewSubmissionForm