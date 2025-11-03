import React from 'react'

function TaskList({taskData, handleDelete, handleEdit}) {
  return (
    <div>
        <ul>
            {
                taskData.map((task) => (
                    <li key={task.id}>
                        <p><span>{task.title}</span> - {task.description} [{task.status}]</p>
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TaskList