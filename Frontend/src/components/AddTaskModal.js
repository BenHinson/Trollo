import React, { useState } from "react";
import SelectUser from "./SelectUser";

export default function AddTaskModal({
  hideModal,
  createNewTask,
  columnId,
  userData,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUserId, setAssignedUserId] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUserChange = (userId) => {
    setAssignedUserId(userId);
  };

  const handleSubmit = (e) => {
    // TODO: This is where API call happens and task is created in the database
    const task = {
      columnId,
      name,
      description,
      userId: assignedUserId,
    };

    e.preventDefault();
    createNewTask(task);
    hideModal();
  };

  const handleOutOfFocus = () => {
    // TODO: Implement a way to hide the modal on "click out", so that it doesn't force the user to create a task once open
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            required
          ></input>
        </label>
        <label>
          Description:
          <input
            value={description}
            onChange={handleDescriptionChange}
            type="text"
            required
          ></input>
        </label>
        <label>
          Assign user:
          <SelectUser userData={userData} handleSelect={handleUserChange} />
        </label>
        <button>Create new task</button>
      </form>
    </div>
  );
}
