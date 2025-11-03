import React from 'react'

function TodoItem({task, deleteTask}) {
  return (
    <div>
      <li>{task.task}</li>
      <button onClick={() => {deleteTask(task.id)}}>Delete</button>
    </div>
  )
}

export default TodoItem