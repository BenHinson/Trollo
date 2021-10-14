import React, { useContext, useEffect } from "react";
import Account from "./Account";
import Authenticated2 from "./Authenticated2";
import { UserContext } from "../UserContext";

export default function AppWrapper() {
  const { user, updateState } = useContext(UserContext);

  // Checks for cookie on load and requests user data if cookie exists
  useEffect(() => {
    async function fetchData() {
      const cookie = localStorage.getItem("authCookie");
      if (cookie) {
        const response = await fetch("http://localhost:2053/user", {
          method: "GET",
          // can swap {'auth':cookie} for {'auth':'trollo'} to skip authentication for development purposes
          headers: { auth: cookie },
        });
        if (response.status === 200) {
          const responseJson = await response.json();
          const userData = responseJson.data;
          updateState(userData);
        }
      }
    }
    fetchData();
  }, []);

  if (user?.username) {
    return <Authenticated2 />;
  }

  return <Account />;
}
