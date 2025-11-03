import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

async function fetchBooksData() {
    try {
        const response = await fetch('https://openlibrary.org/search.json?q=react')
        if (response.ok) {
            const data = await response.json()
            console.log(data.docs)
            const finalData = data.docs
            return finalData;
        }
    } catch (error) {
        return error.message
    }
}

function BookList() {

    const [searchKey, setSearchKey] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)
    
    const {
        data: finalData,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['books'],
        queryFn: () => fetchBooksData()
    })
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    if (isError) {
        return <p>{error.message}</p>
    }
    
    const filterBooks = finalData.filter((book) => book.title.toLowerCase().includes(searchKey.toLowerCase()))
    
    const openDetails = (book) => {
        const show = (
            <div>
                <h2>{book.title}</h2>
                <span>All Authors: {book.author_name}</span><br />
                <span>Author IDs: {book.author_key}</span><br />
                <span>Edition Count: {book.edition_count}</span><br />
                <span>Languages: {book.language}</span><br />
                <span>Cover Edition Key: {book.cover_edition_key}</span><br />
                <span>Has Full Text: {book.has_fulltext}</span><br />
                <span>Ebook Access: {book.ebook_access}</span><br />
                <span>Public Scan: {book.public_scan_b}</span><br />
                <span><button onClick={() => setSelectedBook(null)}>Close</button></span><br />
            </div>
        )
        setSelectedBook(show)
    }

    return (
        <div>
            <input type="text"
                placeholder='Search by title or author'
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                />
                {selectedBook&& selectedBook}
            <div>
                {
                    filterBooks.map((book) => (
                        <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", border: "1px solid black" }} onClick={() => openDetails(book)}>
                            <h3>{book.title}</h3>
                            <p>Author(s): {book.author_name}</p>
                            <p>Year: {book.first_publish_year}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default BookList