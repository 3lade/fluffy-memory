import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';

function TodoList() {

  const [tasks, setTasks] = useState([]);
  console.log(tasks)

  const addTodo = (task) => {
    const newTask = {
      id: Date.now().toString(),
      task,
      completed: false
    }
      setTasks((prevTasks => [...prevTasks, newTask]))
  }

  const editTodo = (id, editedText) => {
    setTasks((prevTasks) => 
      prevTasks.map(task => (
      task.id === id ? {...task, task: editedText} : task
    )))
  }
  const deleteTodo = (id) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id))
  }

  const toggleCompleted = (id) => {
    setTasks((prevTasks) => 
      prevTasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task)
    )
  }
  

  const clearCompletedTasks = (completed) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.completed === !completed))
  }

  return (
    <>
    <div>
        <h1>To-do Catalog</h1>
        <TodoForm addTodo={addTodo}/>
        {
          tasks.map(task => (
            <TodoItem 
                key={task.id}
                task={task} //props
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                toggleCompleted={toggleCompleted}
            />
          ))
        }
    </div>
    <div>
      <button onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
    </>
  )
}

export default TodoList