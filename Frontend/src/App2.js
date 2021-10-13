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
    // Setting cookie to true for testing purposes
    const cookie = localStorage.getItem("authCookie");
    console.log(cookie)
    // const cookie = true
    if (cookie) {
      const response = await fetch('http://localhost:2053/user', {
        method: 'GET',
        // Just for testing purposes need to swap trollo out for the cookie in production  
        headers: { 'auth': cookie },
      })
      console.log(response)
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
