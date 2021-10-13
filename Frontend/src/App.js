import './App.css';
import AppWrapper from './components/AppWrapper';
import { UserProvider } from "./UserContext"

function App() {
  return (
    <UserProvider>
      <AppWrapper />
    </UserProvider>
  )
}

export default App;
