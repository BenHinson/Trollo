import "./App.css";
import AppWrapper from "./components/AppWrapper";
import { UserProvider } from "./UserContext";
import { ProjectMembersProvider } from "./ProjectMembersContext";

function App() {
  return (
    <UserProvider>
      <ProjectMembersProvider>
        <AppWrapper />
      </ProjectMembersProvider>
    </UserProvider>
  );
}

export default App;
