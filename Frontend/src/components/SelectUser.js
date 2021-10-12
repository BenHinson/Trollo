import React, { useState } from "react";

//TODO: Hook up to actual data
export default function SelectUser({ handleSelect, userData }) {

    const options = Object.values(userData).map(user => {
        return <option value={user.id}>{user.name}</option>
    })

    const handleChange = e => {
        const userId = e.target.value;
        handleSelect(userId)
    }

  return (
    <select onChange={handleChange}>
      <option value="" selected disabled hidden></option>
      {options}
    </select>
  );
}
