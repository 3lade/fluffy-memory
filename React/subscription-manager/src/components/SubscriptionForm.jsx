import React, { useState } from 'react'

function SubscriptionForm({addSub}) {

  const [inputValue, setInputValue] = useState({
    name: "",
    cost: "",
  })
  const [category, setCategoryValue] = useState("");

  const [errors, setErrors] = useState({})
  const [successMsg, setSuccessMsg] = useState("")

  const validation = () => {
    const newError = {};

    if(!inputValue.name) newError.name = "Name is Required!"

    if(!inputValue.cost) {
      newError.cost = "Cost is Required!"
    } else {
      const numCost = parseFloat(inputValue.cost)
      if(isNaN(numCost) || numCost <= 0) {
        newError.cost = "Invalid Cost!"
      }
    }

    if(!category) newError.category = "Category is Required!"

    setErrors(newError)
    return Object.keys(newError).length === 0;
  }

  const handleInput = (e) => {
    const {name, value} = e.target;
    setInputValue((prevState) => (
        {...prevState, [name]: value}
    ))

    setErrors((prevState) => (
        {...prevState, [name]: ""}
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setSuccessMsg('')

    if(validation())
    {
      const subscription = {
        id: Date.now().toString(),
        name: inputValue.name,
        cost: parseFloat(inputValue.cost),
        category: category
      } 

      addSub(subscription)
      setSuccessMsg("Successfully added!")

      setInputValue({
        name: "",
        cost: ""
      })
      setCategoryValue("")

      setTimeout(() => {
        setSuccessMsg("");
      }, 2000)
    }

  }

  return (
    <div className='formContainer'>
      <div className='container'>
        <h3>Add Subscription</h3>
        <form className='form' onSubmit={handleSubmit}>
          
          <input type="text" 
            placeholder='Name (e.g., Netflix)'
            name='name'
            value={inputValue.name}
            onChange={handleInput}
          />
          {errors.name && <p className='error'>{errors.name}</p>}

          <input type="text" 
            placeholder='Cost (e.g., 500)'
            name='cost'
            value={inputValue.cost}
            onChange={handleInput}
            />
          {errors.cost && <p className='error'>{errors.cost}</p>}

          <select value={category}
            onChange={(e) => setCategoryValue(e.target.value)}
          >
            <option value="" selected disabled hidden>--Choose a Category--</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="News">News</option>
            <option value="Welfare">Welfare</option>
          </select>
          {errors.category && <p className='error'>{errors.category}</p>}

          <button type='submit' className='submit-btn'>Add</button>
          {successMsg && <p className='success'>{successMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default SubscriptionForm