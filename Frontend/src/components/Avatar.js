import React from "react";

export default function Avatar({ userId, userData }) {
  const avatarImgSrc = userId ? userData[userId].avatar : "";

  return (
    <div>
      <img src={avatarImgSrc} style={style} alt="" />
    </div>
  );
}

// style for development
const style = {
  height: 30,
  width: 30,
};
