import './App.css';
import { useState, useEffect } from 'react';
import Project from "./components/Project"
import Account from "./components/Account"
import Authenticated from "./components/Authenticated"

function App() {
  const [user, setUser] = useState(undefined)

  const loginUser = (user) => {
    console.log(user)
    localStorage.setItem("authCookie", user.cookie)
    setUser(user);
  }

  const cookieAuthentication = () => {

  }
  useEffect(async () => {
    const cookie = localStorage.getItem("authCookie");
    if (cookie) {
      const response = await fetch('http://localhost:2053/user', {
        method: 'GET',
        // can swap {'auth':cookie} for {'auth':'trollo'} to skip authentication for development purposes
        headers: { 'auth': cookie },
      })
      if (response.status === 200) {
        const responseJson = await response.json()
        const userData = responseJson.data
        setUser(userData)
      }
    }
  }, [])

  if (user) {
    return (
      <Authenticated user={user}></Authenticated>
    )
  } else {
    return (
      <Account loginUser={loginUser}></Account>
    )
  }
}

export default App;
