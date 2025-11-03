import React, { useState } from 'react'

function CourseForm({ addCourse }) {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validate = () => {
        const newError = {};
        if (!formData.title) newError.title = "course title is required"
        if (!formData.description) newError.description = "course description is required"

        setErrors(newError)
        return Object.keys(newError).length === 0
    }

    const handleForm = (e) => {
        e.preventDefault()

        if (validate()) {
            // const newCourse = {
                // id: Date.now().toString(),
                // title: formData.title,
                // description: formData.description,
                // // status: "active"
            // }

            addCourse(formData.title, formData.description)
            setErrors({})
            setFormData({
                title: "",
                description: ""
            });
        }
    }

    return (
        <div>
            <form className='form' onSubmit={handleForm}>
            <label htmlFor="title">Course Title</label>
            <input type="text"
                id='title'
                name='title'
                placeholder='Course Title'
                value={formData.title}
                onChange={handleChange}
            />
            {errors.title && <p style={{color: 'red'}}>{errors.title}</p>}
            <br />

            <label htmlFor="description">Course Description</label>
            <textarea id="description" cols="30" rows="10"
                name='description'
                placeholder='Course Description'
                value={formData.description}
                onChange={handleChange}
            ></textarea>
            {errors.description && <p style={{color: 'red'}}>{errors.description}</p>}
            <br />

            <button type='submit'>add course</button>
            </form>
        </div>
    )
}

export default CourseForm