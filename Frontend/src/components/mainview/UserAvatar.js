import React from "react";
import Avatar from "boring-avatars"

export default function UserAvatar({ userId, userData }) {
  let avatarComponent = <Avatar size='30' variant="beam" />

  if (userData[userId].avatar) {
    const avatarImgSrc = userData[userId].avatar
    const str = userData[userId].name
    avatarComponent = <img src={avatarImgSrc} alt={str} />
  }

  return (
    <>
      {avatarComponent}
    </>
  );
}