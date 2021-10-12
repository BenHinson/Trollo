import React, { useState } from "react";
import Avatar from "./Avatar";
import SelectUser from "./SelectUser";

export default function Task({ name, description, userId, userData }) {

  return (
    <div style={style}>
      <h3>{name}</h3>
      <p>{description}</p>
      {userId && <Avatar userData={userData} userId={userId} />}
      <label>
        Assign user
        {/* // TODO: Finish implementing  */}
        <SelectUser />
      </label>
    </div>
  );
}

// style for development

const style = {
  backgroundColor: "aqua",
};
