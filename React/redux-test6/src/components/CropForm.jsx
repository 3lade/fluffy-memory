import React, { useEffect, useState } from 'react'
import { addCrop, updateCrop } from '../redux/cropSlice'
import { useDispatch } from 'react-redux'

function CropForm({currentCrop, setCurrentCrop}) {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        quantity: ''
    })
    const [errors, setErrors] = useState({})



    const validate = () => {
        const newError = {}
        if(!formData.name) newError.name = "Crop name is required"
        if(!formData.type) newError.type = "Crop type is required"
        if(!formData.quantity) newError.quantity = "Quantity is required"

        setErrors(newError)

        return Object.keys(newError).length === 0;
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    useEffect(() => {
        if(currentCrop) {
            setFormData(currentCrop)
            // setFormData({...formData, ...currentCrop})
        }
        setCurrentCrop(null)
    }, [currentCrop])
    

    const dispatch = useDispatch()

    const handleForm = (e) => {
        e.preventDefault()
        if(validate()) {
            if(currentCrop) {
                dispatch(updateCrop(formData))
                setCurrentCrop(null)
            } else {
                const newCrop ={
                    ...formData,
                    quantity: parseInt(formData.quantity)
                }
                dispatch(addCrop(newCrop))
            }
            setFormData({
                name: "",
                type: "",
                quantity: ""
            })
        }
    }

  return (
    <div>
        <h1>Crops Management</h1>
        <form className='form' onSubmit={handleForm}>
            <label htmlFor="name">Crop Name*:</label>
            <input type="text" 
                id='name'
                name='name'
                placeholder='Enter name'
                value={formData.name}
                onChange={handleChange}
            />
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
            <br />

            <label htmlFor="type">Crop Type*:</label>
            <input type="text" 
                id='type'
                name='type'
                placeholder='Enter type'
                value={formData.type}
                onChange={handleChange}
            />
            {errors.type && <p style={{color: 'red'}}>{errors.type}</p>}
            <br />

            <label htmlFor="quantity">Quantity*:</label>
            <input type="number" 
                id='quantity'
                name='quantity'
                placeholder='Enter Quantity'
                value={formData.quantity}
                onChange={handleChange}
            />
            {errors.quantity && <p style={{color: 'red'}}>{errors.quantity}</p>}
            <br />

            <button type='submit'>{currentCrop ? 'Update Crop' : 'Add Crop'}</button>
        </form>
    </div>
  )
}

export default CropForm