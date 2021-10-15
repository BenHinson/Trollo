import React, { useContext, useEffect, useState } from "react";
import Homepage from "./homepage/Homepage";
import Authenticated from "./Authenticated";
import { UserContext } from "../UserContext";


export default function AppWrapper() {
  const { user, updateState } = useContext(UserContext);
  const [pageView, setPageView] = useState('homepage');

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

  return (pageView === 'app' && user?.username) ? <Authenticated /> : <Homepage setPageView={setPageView}/>;
}
