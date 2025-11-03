import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

function VisitorForm() {

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm();

    const [visitors, setVisitors] = useState([]);
    const [editId, setEditId] = useState(null);
 
    const handleEdit = (visitorID) => {
        const findVisitor = visitors.find((visitor) => visitor.id === visitorID)
        
        Object.entries(findVisitor).forEach(([fieldName, value]) => {
            console.log(fieldName, value)
            setValue(fieldName, value)
        })
        setEditId(visitorID)
    }
    
    const handleDelete = (visitorID) => {
        setVisitors((prev) => prev.filter(visitor => visitor.id !== visitorID))

        if(editId === visitorID) {
            reset();
            setEditId(null)
        }
    }
    
    const handleForm = (data) => {
        if(editId !== null) 
        {
            const updateVisitor = visitors.map((visitor) => (
                visitor.id === editId ? {...data, id: editId} : visitor
            ))
            setVisitors(updateVisitor)
            setEditId(null)
        } else {
            setVisitors([...visitors, { ...data, id: Date.now() }])
        }
        reset();
    }

    return (
        <div>
            <h1>Visitor Entry Form</h1>
            <form onSubmit={handleSubmit(handleForm)}>
                <label htmlFor='visitorName'>Visitor Name</label>
                <input id='visitorName'
                    {...register("visitorName", { required: "Name is required" })}
                />
                {errors.visitorName && <p style={{ color: 'red' }}>{errors.visitorName.message}</p>}
                <br />

                <label htmlFor='contactNumber'>Contact Number</label>
                <input id='contactNumber'
                    {...register("contactNumber", {
                        required: "Contact is required",
                        pattern: {
                            value: /^\+?[1-9][0-9]{7,14}$/,
                            message: "Contact Number is not valid"
                        }
                    })}
                />
                {errors.contactNumber && <p style={{ color: 'red' }}>{errors.contactNumber.message}</p>}
                <br />

                <label htmlFor='visitDate'>Visit Date</label>
                <input id='visitDate'
                    type='date'
                    {...register("visitDate", { required: "Visit date is required" })}
                />
                {errors.visitDate && <p style={{ color: 'red' }}>{errors.visitDate.message}</p>}
                <br />

                <label htmlFor='purpose'>Purpose</label>
                <textarea id="purpose"
                    {...register("purpose", { required: "Purpose is required" })}
                />
                {errors.purpose && <p style={{ color: 'red' }}>{errors.purpose.message}</p>}
                <br/>

                <button>{editId ? 'Update Entry' : 'Register Visitor'}</button>
            </form>

            <div>
                <h2>Registered Visitors</h2>
                <ul>
                    {
                        visitors.map((visitor) => (
                            <>
                                <li key={visitor.id}>
                                    <span><strong>Name:</strong>{visitor.visitorName}</span><br />
                                    <span><strong>Contact:</strong>{visitor.contactNumber}</span><br />
                                    <span><strong>Date:</strong>{visitor.visitDate}</span><br />
                                    <span><strong>Purpose:</strong>{visitor.purpose}</span><br />
                                    <button onClick={() => handleEdit(visitor.id)}>Edit</button>
                                    <button onClick={() => handleDelete(visitor.id)}>Delete</button>
                                </li>
                            </>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default VisitorForm