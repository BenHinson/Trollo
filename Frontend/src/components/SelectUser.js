import React from "react";

//TODO: Hook up to actual data
export default function SelectUser({ assignedUser, handleAssignedUserSelect }) {
  return (
    <select value={assignedUser} onChange={handleAssignedUserSelect}>
      <option value="" selected disabled hidden></option>
      <option value="Ben">Ben</option>
      <option value="Gabriel">Gabriel</option>
      <option value="Jenny">Jenny</option>
    </select>
  );
}
