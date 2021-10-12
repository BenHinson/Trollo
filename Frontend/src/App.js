import './App.css';
import Project from "./components/Project"
import Account from "./components/Account"
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(undefined)
  return (
    <div className="App">
      <Account></Account>
      <Project />
    </div>
  );
}

export default App;
