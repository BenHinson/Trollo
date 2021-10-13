import React from "react";
import Avatar from "boring-avatars"

export default function UserAvatar({ userId, userData }) {
  let avatarComponent = <Avatar size={style.height} variant="beam" />

  if (userData[userId].avatar) {
    const avatarImgSrc = userData[userId].avatar
    const str = userData[userId].name
    avatarComponent = <img src={avatarImgSrc} style={style} alt={str} />
  }

  return (
    <div>
      {avatarComponent}
    </div>
  );
}

// style for development
const style = {
  height: 30,
  width: 30,
};
