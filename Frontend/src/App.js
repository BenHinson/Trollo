import './App.css';
import { useState } from 'react';
import Project from "./components/Project"
import Account from "./components/Account"
import Authenticated from "./components/Authenticated"

function App() {
  const [user, setUser] = useState(undefined)

  const loginUser = (user) => {
    setUser(user);
  }
  if(user) {
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
