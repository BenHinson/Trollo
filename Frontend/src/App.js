import './App.css';
import { useState } from 'react';
import Project from "./components/Project"
import Board from "./components/Board"
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
      <div>
        <Account loginUser={loginUser}></Account>
        <Board />
      </div>
    )
  }
}

export default App;
