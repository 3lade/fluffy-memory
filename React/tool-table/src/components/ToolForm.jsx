import React, {useState } from 'react'

function TodoForm({addTool}) {

    const [borrower, setBorrower] = useState("");
    const [toolName, setToolName] = useState("")
    const [dateLent, setLentDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({})
    const [globalError, setGlobalError] = useState("");


    const validation = () => {
        let newErrors = {};
        // const allEmpty = !borrower && !toolName && !dateLent && !dueDate
        // setErrors({});

        if(!borrower) newErrors.borrower = "Name is required"
        if(!toolName) newErrors.toolName = "Tool name is required"
        if(!dateLent) newErrors.dateLent = "Lend date is required"
        if(!dueDate) newErrors.dueDate = "dueDate is required"
        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    }


    const handleForm = (e) => {
        e.preventDefault()
        if(validation())
        {
            setGlobalError("");
            addTool({
                id: Date.now().toString(),
                borrower, toolName, dateLent, dueDate, notes
            })
            setBorrower("");
            setToolName("");
            setLentDate("");
            setDueDate("");
            setNotes("");
        } else {
            setGlobalError("Please fill all required fields")
        }
    }

  return (
    <div>
        <form className='form' onSubmit={handleForm}>
            <input type="text" 
                placeholder="Enter borrower's name"
                value={borrower}
                onChange={(e) => {setBorrower(e.target.value)}}
            />
            <p className='error'>{errors.borrower}</p>

            <input type="text" 
                placeholder="Enter tool name"
                value={toolName}
                onChange={(e) => {setToolName(e.target.value)}}
            />
            <p className='error'>{errors.toolName}</p>

            <label htmlFor="date-lent">Date Lent</label>
            <input type="date" 
                id='date-lent'
                placeholder="Enter Lent date name"
                value={dateLent}
                onChange={(e) => {setLentDate(e.target.value)}}
            />
            <p className='error'>{errors.dateLent}</p>

            <label htmlFor="due-date">Due Date</label>
            <input type="date"
                id='due-date' 
                placeholder="Enter Due date name"
                value={dueDate}
                onChange={(e) => {setDueDate(e.target.value)}}
            />
            <p className='error'>{errors.dueDate}</p>

            <textarea  cols="30" rows="10" 
                placeholder='Enter any additional notes (optional)'
                value={notes}
                onChange={(e) => {setNotes(e.target.value)}}
            ></textarea>
            <p className='error'>{globalError}</p>

            <button type='submit' className='submit-btn'>Submit Record</button>
        </form>
    </div>
  )
}

export default TodoForm