import React, { useState } from 'react'
import TodoForm from './TodoForm'
import TodoItem from './TodoItem';

function TodoList() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      task,
      completed: false
    }
    setTasks(prevTask => [...prevTask, newTask])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id))
  }

  return (
    <div>
      <h1>Todo-List</h1>
      <TodoForm addTask={addTask}/>
      {
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
          deleteTask={deleteTask}
          />
        ))
      }
    </div>
  )
}

export default TodoList