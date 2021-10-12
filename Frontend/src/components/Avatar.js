import React from "react";

export default function Avatar({ userId, userData }) {
  const avatarImgSrc = userData[userId].avatar;

  return (
    <div>
      <img src={avatarImgSrc} style={style} />
    </div>
  );
}

// style for development
const style = {
  height: 30,
  width: 30,
};
