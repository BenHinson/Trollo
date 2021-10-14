import React, { useState } from "react";
import UserAvatar from "./UserAvatar";
import SelectUser from "./SelectUser";

export default function Task({ name, description, userId, userData }) {
  const [assignedUserId, setAssignedUserId] = useState(userId);

  const handleUserChange = (userId) => {
    setAssignedUserId(userId);
  };

  const userComponent = assignedUserId ? (
    <UserAvatar userData={userData} userId={assignedUserId} />
  ) : (
    <label>
      Assign user
      <SelectUser handleSelect={handleUserChange} userData={userData} />
    </label>
  );

  return (
    <div style={style}>
      <h3>{name}</h3>
      <p>{description}</p>
      {userComponent}
    </div>
  );
}

// style for development
const style = {
  backgroundColor: "aqua",
};
