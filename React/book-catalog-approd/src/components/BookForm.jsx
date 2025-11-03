import React, { useState } from 'react'

function BookForm({addBook, toggleFavView, showFavOnly}) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [error, setError] = useState("");

    const handleForm = (e) => {
        e.preventDefault();
        if(!title || !author)
        {
            setError("Title and Author are required.");
            return;
        }

        const book = {
            id: Date.now().toString(),
            title,
            author,
            genre,
            favorite: false
        }
        addBook(book)

        setTitle('');
        setAuthor('');
        setGenre('');
        setError('');
    }

  return (  
    <div>
        <form className='formdata' onSubmit={handleForm}>
            <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='Book Title' value={title}/>
            <input type='text' onChange={(e) => setAuthor(e.target.value)} placeholder='Author' value={author}/>
            <input type='text' onChange={(e) => setGenre(e.target.value)} placeholder='Genre (optional)' value={genre}/>
            <button type='submit'>Add Book</button>
        </form>
            <button type='button' onClick={toggleFavView}>
                {showFavOnly ? 'Show All' : 'Show Favorites Only'}
            </button>
        <div style={{color: 'red'}}>{error}</div>
    </div>
  )
}

export default BookForm