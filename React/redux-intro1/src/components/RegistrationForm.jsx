import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMember, updateMember } from '../redux/clubSlice'

function RegistrationForm({ selectClub, onClose, editData }) {

    // console.log("hello from registrationForm")


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        interest: ""
    })

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!formData.name || !formData.email) {
            alert("Full Name and Email are required");
            return
        }
        const payload = {
            club: selectClub,
            name: formData.name,
            email: formData.email,
            interest: formData.interest
        }

        if(editData) {
            dispatch(updateMember({...payload, id: editData.id}));
        } else {
            dispatch(addMember(payload))
            setFormData({
                name: "",
                email: "",
                interest: ""
            })
        }

        onClose(); //make the registerForm disappear only when the submit is done successfully

    }

    /////performing edit

    useEffect(() => {
        if(editData) {
            setFormData({
                name: editData.name,
                email: editData.email,
                interest: editData.interest
            })
        }  else {
            setFormData({
                name: "",
                email: "",
                interest: ""
            })
        }
    }, [editData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    return (
        <div className='formContainer' style={{ textAlign: "center" }}>
            <h2>Join {selectClub}</h2>
            <form className='form' onSubmit={handleSubmit} noValidate>
                <input type="text"
                    name='name'
                    placeholder='Full Name'
                    value={formData.name}
                    onChange={handleChange}
                    required

                />
                <input type="email"
                    name='email'
                    placeholder='Email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input type="text"
                    name='interest'
                    placeholder='Interest'
                    value={formData.interest}
                    onChange={handleChange}
                />
                <button type='submit'>{editData ? 'Update' : 'Submit'}</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    )
}

export default RegistrationForm