import React, {useState} from "react";
import Avatar from "./Avatar";
import SelectUser from "./SelectUser";

export default function Task({ name, description, userId, userData }) {

  const hand

  const userComponent = userId ? (
    <Avatar userData={userData} userId={userId} />
  ) : (
    <label>
        Assign user
        {/* <SelectUser assignedUser={usersId} userData={userData}/> */}
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
