import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo,  } from './todoSlice';
import './TodoList.css'

function TodoList() {

    const [input, setInput] = useState([]);
    const todos = useSelector(state => state.todos)
    const Dispatch = useDispatch();

    const handleAddTodo = () => {
      if(!input)
      {
        alert("Please add a Todo")
        return;
      }
      Dispatch(addTodo(input))
      setInput('');
    }

  return (
    
    <div>
      <h1>todo list</h1>
        <div>
            <input type="text" 
                placeholder='Enter todo...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleAddTodo} disabled={input.length === 0 ? true : false}>Add</button>
        </div>
        { todos.length === 0 ? (
          <p>No todos yet.</p>
        ) : (
          <ul>
            {
              todos.map((todo) => (
                <li key={todo.id}>
                  <input type="checkbox"
                    checked={todo.completed}
                    onChange={() => Dispatch(toggleTodo(todo.id))}
                  />
                  <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                  <button onClick={() => Dispatch(deleteTodo(todo.id))}>Delete</button>
                </li>
              ))
            }
          </ul>
        )}
    </div>
  )
}

export default TodoList