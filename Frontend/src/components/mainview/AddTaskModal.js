import React, { useState, useContext } from "react";
import { ProjectMembersContext } from "../../ProjectsMembersContext";
import SelectUser from "./SelectUser";

export default function AddTaskModal({ hideModal, createNewTask, columnId }) {
  const [members, updateMembers] = useContext(ProjectMembersContext);
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
      assigned: assignedUserId,
    };

    e.preventDefault();
    createNewTask(task);
    hideModal();
  };

  const handleOutOfFocus = () => {
    // TODO: Implement a way to hide the modal on "click out", so that it doesn't force the user to create a task once open
  };

  return (
    <div className="createTask">
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          required
          placeholder='Name...'
        ></input>
        <input
          value={description}
          onChange={handleDescriptionChange}
          type="text"
          required
          placeholder='Description...'
        ></input>
        <SelectUser userData={members} handleSelect={handleUserChange} selectDefault={'Assign User'} />
        <button>Create new task</button>
      </form>
    </div>
  );
}
