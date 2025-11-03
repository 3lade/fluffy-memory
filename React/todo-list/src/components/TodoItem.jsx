import React, { useState } from 'react';

function TodoItem({ task, editTodo, deleteTodo, toggleCompleted }) {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedTask] = useState(task.task);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    editTodo(task.id, editedText);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task.task);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`} role="listitem">
      {
        isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedTask(e.target.value)}
              onBlur={handleCancel}
              autoFocus
              role="textbox"
            />
            <button onMouseDown={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <div>
            <span onClick={handleEdit}>{task.task}</span>
          </div>
        )
      }
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleCompleted(task.id)}
      />
      <button onClick={() => deleteTodo(task.id)}>Delete</button>
    </div>
  );
}

export default TodoItem;