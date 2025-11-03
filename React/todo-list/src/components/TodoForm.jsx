import React, { useState } from 'react'

function TodoForm({addTodo}) {

    const [inputValue, setInputValue] = useState('');

    const handleForm = (e) => {
      e.preventDefault();
      if(!inputValue.trim())
      {
        return;
      }
  
      addTodo(inputValue)
  
      setInputValue('')
    }


  return (
    <>
    <form className="formData" onSubmit={handleForm}>
        <input type='text' 
          placeholder='Enter a task' 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)}/>
        <button type='submit'>Add</button>
    </form>
    </>
  )
}

export default TodoForm