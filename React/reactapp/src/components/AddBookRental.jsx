import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBookRental() {
  const BASE_URL = "http://localhost:8080/books";

  const [bookData, setBookData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL);
      if (response.data) {
        setBookData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigator = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    rentalName: "",
    rentalDate: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.genre ||
      !formData.price ||
      !formData.rentalDate ||
      !formData.rentalName
    ) {
      setSuccess("");
      setError("Please fill all required fields");
    } else {
      const response = await axios.post(BASE_URL, { ...formData });
      if (response.data) {
        setError("");
        setSuccess("Rental added successfully!");
        navigator('/rentals')
      }
    }
    setFormData({
      title: "",
      author: "",
      genre: "",
      rentalName: "",
      rentalDate: "",
      price: "",
    });
  };

  // console.log(bookData);

  return (
    <div>
      <h3>Add Rental Book</h3>
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
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
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
          value={formData.rentalName}
          onChange={handleChange}
        />
        <label htmlFor="rentalDate">Renter Date</label>
        <input
          type="date"
          id="rentalDate"
          name="rentalDate"
          value={formData.rentalDate}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Rental</button>
      </form>
    </div>
  );
}

export default AddBookRental;
