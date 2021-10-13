import React, { useContext } from "react";
import Account from "./Account";
import Authenticated from "./Authenticated";
import { UserContext } from "../UserContext";

export default function AppWrapper() {
  const [user, updateState] = useContext(UserContext);
  console.log(user);

  const loginUser = (user) => {
    updateState(user);
  };

  if (user?.username) {
    return <Authenticated />;
  }

  return <Account loginUser={loginUser} />;
}
