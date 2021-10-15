import React, { useState, useContext } from "react";
import UserAvatar from "./UserAvatar";
import SelectUser from "./SelectUser";
import { ProjectMembersContext } from "../../ProjectsMembersContext";

export default function Task({ name, description, userId }) {
  const [members] = useContext(ProjectMembersContext);
  const [assignedUserId, setAssignedUserId] = useState(userId);

  // Make API call to assign the task

  console.log("Rendering task", members);

  const handleUserChange = (userId) => {
    setAssignedUserId(userId);
  };

  const userComponent = assignedUserId && (
    <UserAvatar userId={assignedUserId} />
  );
  // ) : (
  //   <SelectUser handleSelect={handleUserChange} />
  // );

  return (
    <div className="columnTask">
      <h3>{name}</h3>
      <p>{description}</p>
      {userComponent}
    </div>
  );
}
