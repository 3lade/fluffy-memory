import React, { useState } from 'react'

function TodoForm({addTask}) {

  const [inputValue, setInputValue] = useState('');

  const handleForm = (e) => {
    e.preventDefault()

    if(!inputValue.trim())
    {
      return
    }
    addTask(inputValue)
    setInputValue('')
  } 


  return (
    <form className='formData' onSubmit={handleForm}>
        <input type="text" 
          placeholder='Add a task'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit'>Add</button>
    </form>
  )
}

export default TodoForm