import React, { useState } from "react";
// dummy data to make component work
const users = {
  1: {
    avatar:
      "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
  },
  2: {
    avatar:
      "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
  },
};

export default function Avatar({ userId }) {
  const avatarImgSrc = users[userId].avatar;

  // style for development
  const style = {
    height: 30,
    width: 30,
  };

  return (
    <div>
      <img src={avatarImgSrc} style={style} />
    </div>
  );
}
