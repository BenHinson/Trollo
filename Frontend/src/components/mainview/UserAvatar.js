import React, { useContext } from "react";
import Avatar from "boring-avatars";
import { ProjectMembersContext } from "../../ProjectsMembersContext";

export default function UserAvatar({ userId, size }) {
  console.log("Rendering avatar", userId, size);
  if (!size) {
    size = 30;
  }
  return (
    <Avatar
      size={size}
      variant="beam"
      colors={["#763bff", "#C4FF3B", "#d83bff", "#FAE3E3", "#B4D4EE"]}
      name={userId.toString(16)}
    />
  );
}
