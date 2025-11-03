import React, { useEffect, useState } from "react";

function TaskForm({ handleAdd, editing, handleUpdate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (editing) {
      setFormData(
        editing
      //   {
      //   id: editing.id,
      //   title: editing.title || "",
      //   description: editing.description || "",
      //   status: editing.status || "pending",
      // }
    );
    }
  }, [editing]);

  const handleForm = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert("Please enter both title and description.");
      return;
    }
    // const newTask = {
    //     title: formData.title,
    //     description: formData.description,
    //     status: formData.status
    // }
    if (editing) {
      handleUpdate(formData);
    } else {
      handleAdd(formData);
    }
    setFormData({
      title: "",
      description: "",
      status: "pending",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">{editing ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
