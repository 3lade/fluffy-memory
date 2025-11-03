import React, { useState } from 'react'

function ContactForm() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState({})
    const [formMessage, setFormMessage] = useState("")

    const validation = () => {
        const newError = {}

        if(!firstName.trim()) newError.firstName = "First name is required"
        if(!lastName.trim()) newError.lastName = "Last name is required"
        if(!email.trim()) newError.email = "Email is required"
        if(!phone.trim()) newError.phone = "Phone number is required"
        if(!address.trim()) newError.address = "Address is required"
        if(!pincode.trim()) newError.pincode = "Pincode is required"
        if(!message.trim()) newError.message = "Message is required"

        if(!age.trim()) {
            newError.age = "Age is required"
        } else {
            const numAge = parseInt(age)
            if(isNaN(numAge) || numAge < 0 || numAge>120) {
            newError.age = "Invalid age"
            }
        }

        console.log('Age value:', age)
        console.log('Age error:', newError.age)

        const emailRegex = /^[^\s]+@[^\s@]+\.[^\s@]+$/
        if(email && !emailRegex.test(email))
        {
            newError.email = "Invalid email format"
        }
        if(phone && (!/^\d{10}$/.test(phone)))
        {
            newError.phone = "Invalid phone number"
        }
        if(pincode && (!/^\d{6}$/.test(pincode)))
        {
            newError.pincode = "Invalid pincode"
        }

        setError(newError)
        return Object.keys(newError).length === 0;

    }

    const handleForm = (e) => {
        e.preventDefault()

        if(validation())
        {
            setFormMessage("Form submitted successfully!")
            setFirstName('')
            setLastName('')
            setAge('')
            setEmail('')
            setPhone('')
            setAddress('')
            setPincode('')
            setMessage('')
        }
    }



  return (
    <div>
        <form className='form' onSubmit={handleForm}>
        <p>{formMessage}</p>
            <h1>Contact Form</h1>
            <label htmlFor="first-Name">First Name:</label>
            <input type="text"
                id='first-Name'
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value)}}
            />
            <p>{error.firstName}</p>

            <label htmlFor="last-Name">Last Name:</label>
            <input type="text"
                id='last-Name'
                value={lastName}
                onChange={(e) => {setLastName(e.target.value)}}
            />
            <p>{error.lastName}</p>

            <label htmlFor="Age">Age:</label>
            <input type="text"
                id='Age'
                value={age}
                onChange={(e) => {setAge(e.target.value)}}
            />
            <p>{error.age}</p>

            <label htmlFor="Email">Email:</label>
            <input type="text"
                id='Email'
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <p>{error.email}</p>

            <label htmlFor="Phone">Phone:</label>
            <input type="text"
                id='Phone'
                value={phone}
                onChange={(e) => {setPhone(e.target.value)}}
            />
            <p>{error.phone}</p>

            <label htmlFor="Address">Address:</label>
            <input type="text"
                id='Address'
                value={address}
                onChange={(e) => {setAddress(e.target.value)}}
            />
            <p>{error.address}</p>

            <label htmlFor="Pincode">Pincode:</label>
            <input type="text"
                id='Pincode'
                value={pincode}
                onChange={(e) => {setPincode(e.target.value)}}
            />
            <p>{error.pincode}</p>

            <label htmlFor="Message">Message:</label>
            <input type="text"
                id='Message'
                value={message}
                onChange={(e) => {setMessage(e.target.value)}}
            />
            <p>{error.message}</p>

            <button type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default ContactForm