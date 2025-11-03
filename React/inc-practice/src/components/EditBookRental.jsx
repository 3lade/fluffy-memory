import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../api";

function EditBookRental() {

    const [formData, setFormData] =useState({
            title: '',
            author: '',
            genre: '',
            renterName: '',
            rentalDate: '',
            price: ''
        })
    const {id} = useParams()

    const [globalError, setGlobalError] = useState('')
    const [globalSuccess, setGlobalSuccess] = useState('')
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

     const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      if (response.data) {
        setFormData(response.data);
      }
    } catch (error) {
        setGlobalSuccess('')
        setGlobalError("Failed to fetch data")
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, formData)
            if(response.data) {
                console.log(response.data);
                setGlobalError('')
                setGlobalSuccess("Successfully Updated!")
                navigate('/')
            }
        } catch (error) {
            setGlobalSuccess('')
            setGlobalError('Failed to update the book')
            console.log(error.message);
        }
    }


  return (
    <div>
      <h3>Edit Book</h3>
      {globalError && (
        <p className="error" style={{ color: "red" }}>
          {globalError}
        </p>
      )}
      <form className="form" onSubmit={handleForm}>
        <div>
          <label htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
          </select>
        </div>

        <div>
          <label htmlFor="renterName">Renter Name</label>
          <input
            type="text"
            id="renterName"
            name="renterName"
            value={formData.renterName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="rentalDate">Rental Date</label>
          <input
            type="date"
            id="rentalDate"
            name="rentalDate"
            value={formData.rentalDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Rental</button>
        {globalSuccess && (
          <p className="success" style={{ color: "green" }}>
            {globalSuccess}
          </p>
        )}
      </form>
    </div>
  );
}

export default EditBookRental;
