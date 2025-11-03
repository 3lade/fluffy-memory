import React, { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all the fields")
      return
    }

    setIsSubmitted(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handelClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      message: ""
    })
  }
  return (
    <div>
      <h1>Contact Me</h1>
      {isSubmitted ?
        (<div>
          <h2>Successfully Sent!!!</h2>
          <button onClick={handelClose}>Close</button>
        </div>)
        :

        (
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text"
              id='name'
              name='name'
              placeholder='Name...'
              value={formData.name}
              onChange={handleChange}

            />
            <label htmlFor="email">Email:</label>
            <input type="email"
              id='email'
              name='email'
              placeholder='Email...'
              value={formData.email}
              onChange={handleChange}

            />
            <label htmlFor="message">Message:</label>
            <textarea type="text"
              id='message'
              name='message'
              placeholder='Message...'
              value={formData.message}
              onChange={handleChange}

            >
            </textarea>
            <button type='submit'>Send</button>
          </form>)
      }
    </div>
  )
}

export default Contact