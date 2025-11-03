import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBookRental() {
  const BASE_URL = "http://localhost:8080/books";
  const [fetchedData, setFetchedData] = useState({
    id: '',
    title: "",
    author: "",
    genre: "",
    price: "",
    rentalDate: "",
    rentalName: ""
  });

  const {id} = useParams()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      console.log(response.data);
      if (response.data) {
        setFetchedData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFetchedData((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate()

  const handleForm = async (e) => {
    e.preventDefault();
    if(!fetchedData.title ||
      !fetchedData.author ||
      !fetchedData.genre ||
      !fetchedData.price ||
      !fetchedData.rentalDate ||
      !fetchedData.rentalName) {

        setSuccess('')
        setError("Please fill all the required fields")
      } else {
        try {
          const response = await axios.put(`${BASE_URL}/${id}`, fetchedData)
          setError('')
          setSuccess("Book has Been successfully Updated")
          navigate('/rentals')

        } catch (error) {
          setSuccess('')
          setError('Failed to update the Book!')
        }
      }
  };

  return (
    <div>
      <h3>Edit the Rental Book</h3>
      <p style={{ color: "red" }} className="error">
        {error}
      </p>
      <p style={{ color: "green" }} className="success">
        {success}
      </p>
      <form className="form" onSubmit={handleForm}>
        <label htmlFor="title">Book Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={fetchedData.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={fetchedData.author}
          onChange={handleChange}
        />
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={fetchedData.genre}
          onChange={handleChange}
        >
          <option value="">--select genre--</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
        </select>
        <label htmlFor="rentalName">Renter Name</label>
        <input
          type="text"
          id="rentalName"
          name="rentalName"
          value={fetchedData.rentalName}
          onChange={handleChange}
        />
        <label htmlFor="rentalDate">Renter Date</label>
        <input
          type="date"
          id="rentalDate"
          name="rentalDate"
          value={fetchedData.rentalDate}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={fetchedData.price}
          onChange={handleChange}
        />
        <button type="submit">Update Rental</button>
      </form>
    </div>
  );
}

export default EditBookRental;
  