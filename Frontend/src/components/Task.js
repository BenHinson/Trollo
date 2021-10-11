import React, { useState } from "react";
import Avatar from "./Avatar"

export default function Task({ name, description }) {
  const [userId, setUserId] = useState(null);

  const assignUser = (userId) => {
      setUserId(userId)
  }

  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
      {userId && <Avatar userId={userId} />}
    </div>
  );
}
