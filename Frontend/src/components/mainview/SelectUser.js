import React, { useState, useContext } from "react";
import { ProjectMembersContext } from "../../ProjectsMembersContext";

export default function SelectUser({ handleSelect, selectDefault }) {
  const [members] = useContext(ProjectMembersContext)
  
  const options = members.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const handleChange = (e) => {
    const userId = e.target.value;
    handleSelect(userId);
  };

  // Do not ask me why you need two options to display the default info...
  return (
    <select onChange={handleChange} defaultValue="">
      <option value='' selected disabled hidden>{selectDefault}</option>
      <option value='' selected disabled hidden>{selectDefault}</option>
      {options}
    </select>
  );
}
