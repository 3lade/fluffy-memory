import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api";
import { useNavigate } from "react-router-dom";

function BookRentalList() {
  const [fetchedData, setFetchedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response.data) {
        setFetchedData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      if (response.data) {
        console.log(response.data);
        setFetchedData((prev) => prev.filter((book) => book.id !== id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [sortByDate, setSortByDate] = useState(false);
  const [sortByPrice, setSortByPrice] = useState("asc");
  
  const handleSort = () => {
    setSortByPrice((prev) => prev === 'asc' ? 'desc' : 'asc')
  }
  const getFilteredData = () => {
  let data = [...fetchedData];

  // Search
  if (searchValue) {
    data = data.filter((book) =>
      book.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Filter
  if (filterValue !== "All") {
    data = data.filter((book) => book.genre === filterValue);
  }

  // Sort by date (only if checkbox is checked)
  if (sortByDate) {
    data.sort((a, b) => new Date(a.rentalDate) - new Date(b.rentalDate));
  }

  // Sort by price
  if (sortByPrice === "asc") {
    data.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  } else if (sortByPrice === "desc") {
    data.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  }

  return data;
};

const displayData = getFilteredData();
  return (
    <div>
      <h3>Book Rental List</h3>

      <label htmlFor="search">Searching by Title</label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <label htmlFor="filter">Filter by genre</label>
      <select
        id="filter"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Fiction">Fiction</option>
        <option value="Non-Fiction">Non-Fiction</option>
      </select>

      <label htmlFor="sort">Sort by Date</label>
      <input
        type="checkbox"
        id="sort"
        checked={sortByDate}
        onChange={() => setSortByDate(!sortByDate)}
      />

      <label htmlFor="sortPrice">Sort By Price</label>
      <button id="sortPrice" onClick={handleSort}>
        {sortByPrice === "asc" ? "Sort By Ascending" : "Sort By Descending"}
      </button>

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
          {displayData.map((book) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookRentalList;
