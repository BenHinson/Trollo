import React, { useState } from "react";

export default function SelectUser({ handleSelect, userData }) {
  const options = Object.values(userData).map((user) => {
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

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled hidden></option>
      {options}
    </select>
  );
}
