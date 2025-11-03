import React, { useState } from 'react'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, updateTask } from '../slice/taskSlice'

function TaskManager() {
    const taskData = useSelector(state => state.tasks)

    const [editing, setEditing] = useState(null)

    const dispatch = useDispatch();

    const handleAdd = (task) => {
        dispatch(addTask(task))
    }

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId))
    }

    const handleEdit = (task) => {
        setEditing(task)
    }

    const handleUpdate = (task) => {
        dispatch(updateTask(task))
        setEditing(null)
    }

  return (
    <div>
        <h1>Task Manager</h1>
        <TaskForm handleAdd={handleAdd} editing={editing} handleUpdate={handleUpdate}/>
        <TaskList taskData={taskData} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  )
}

export default TaskManager