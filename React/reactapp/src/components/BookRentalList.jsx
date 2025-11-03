import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookRentalList() {
  const BASE_URL = "http://localhost:8080/books";
  const [bookData, setBookData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response.statusText === "OK") {
        setBookData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {      
      const response = await axios.delete(`${BASE_URL}/${id}`)
      if(response.statusText === "OK") {
        setBookData((prev) => prev.filter(book => book.id !== id))
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const [searchValue, setSearchValue] = useState('')
  const [filterValue, setFilterValue] = useState('All')
  const [sortingValue, setSortingValue] = useState(false)
  const searchByRender = () => {
    let filteredData = [...bookData]

    //searching
    if(searchValue) {
      filteredData = filteredData.filter((book) => book.rentalName.toLowerCase().includes(searchValue.toLowerCase()))
    }

    //filtering
    if(filterValue !== 'All') {
      filteredData = filteredData.filter(book => book.genre === filterValue)
    }

    //sorting
    if(sortingValue) {
      // filteredData.sort((a, b) => {
      //   const dateA = new Date(a.rentalDate)
      //   const dateB = new Date(b.rentalDate)
      //   return dateA - dateB //ascending order
      // })
      filteredData.sort((a, b) => a.rentalDate.localeCompare(b.rentalDate))
    }

    return filteredData
  }
  const displayData = searchByRender()

  return (
    <div>
      <h3>Book Rental</h3>

      <label htmlFor="search">Search by Renter:</label>
      <input type="text" 
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <label htmlFor="filter">Filter by Genre:</label>
      <select
        id="filter"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
      </select>

      <label htmlFor="sort">Sort by Date</label>
      <input type="checkbox" 
        id="sort"
        checked={sortingValue}
        onChange={(e) => setSortingValue(e.target.checked)}
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Renter</th>
            <th>Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            displayData.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.rentalName}</td>
                <td>{book.rentalDate}</td>
                <td>{book.price}</td>
                <td>
                  <button onClick={() => handleEdit(book.id)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default BookRentalList;
