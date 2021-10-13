import React, { useContext, Fragment } from "react";
import Project from "./Project"

import { UserContext } from "../UserContext";

export default function Authenticated() {
  const { user, handleLogout } = useContext(UserContext);

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  return (
      <Fragment>         
          <Project/>
    </Fragment>
  );
}
