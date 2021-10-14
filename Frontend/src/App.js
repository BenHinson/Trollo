import "./App.css";
import AppWrapper from "./components/AppWrapper";
import { UserProvider } from "./UserContext";
import { ProjectsProvider } from "./ProjectsContext";

function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <AppWrapper />
      </ProjectsProvider>
    </UserProvider>
  );
}

export default App;
