import React, { useState } from "react";
import Avatar from "./Avatar"
import SelectUser from "./SelectUser";

export default function Task({ name, description }) {
  const [userId, setUserId] = useState(null);

  const assignUser = (userId) => {
      setUserId(userId)
  }

  return (
    <div style={style}>
      <h3>{name}</h3>
      <p>{description}</p>
      {userId && <Avatar userId={userId} />}
      <label>
        Assign user
        <SelectUser />
      </label>
    </div>
  );
}

// style for development

const style = {
    backgroundColor: "aqua"
}
