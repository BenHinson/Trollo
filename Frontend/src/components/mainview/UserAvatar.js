import React, { useContext } from "react";
import Avatar from "boring-avatars";
import { ProjectMembersContext } from "../../ProjectsMembersContext";

export default function UserAvatar({ userId }) {
  const [members] = useContext(ProjectMembersContext);
  let avatarComponent = <Avatar size="30" variant="beam" />;

  if (members[userId]?.avatar) {
    const avatarImgSrc = members[userId].avatar;
    const str = members[userId].username;
    avatarComponent = <img src={avatarImgSrc} alt={str} />;
  }

  return <>{avatarComponent}</>;
}
