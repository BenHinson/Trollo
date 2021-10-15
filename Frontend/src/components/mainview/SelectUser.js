import React from "react";

export default function SelectUser({ handleSelect, userData }) {
  const options = Object.values(userData).map((user) => {
    return <option value={user.id}>{user.name}</option>;
  });

  const handleChange = (e) => {
    const userId = e.target.value;
    handleSelect(userId);
  };

  // Do not ask me why you need two options to display the default info...
  return (
    <select onChange={handleChange}>
      <option value='' selected disabled hidden>Set Task For</option>
      <option value='' selected disabled hidden>Set Task For</option>
      {options}
    </select>
  );
}
