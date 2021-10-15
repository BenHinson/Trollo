import React, { useState, useContext } from "react";
import UserAvatar from "./UserAvatar";
import SelectUser from "./SelectUser";
import { task } from "../../Styling/Stylesheet";
import { ProjectMembersContext } from "../../ProjectsMembersContext";

export default function Task({ name, description, userId }) {
  const [members] = useContext(ProjectMembersContext);
  const [assignedUserId, setAssignedUserId] = useState(userId);

  console.log("Rendering task", members);

  const handleUserChange = (userId) => {
    setAssignedUserId(userId);
  };

  const userComponent = assignedUserId ? (
    <UserAvatar userData={members} userId={assignedUserId} />
  ) : (
    <label>
      Assign user
      <SelectUser handleSelect={handleUserChange} userData={members} />
    </label>
  );

  return (
    <div style={task}>
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
