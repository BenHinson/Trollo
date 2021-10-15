import AppWrapper from "./components/AppWrapper";
import { UserProvider } from "./UserContext";
import { ProjectsProvider } from "./ProjectsContext";
import { ProjectMembersProvider } from "./ProjectsMembersContext"

function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <ProjectMembersProvider>
          <AppWrapper />
        </ProjectMembersProvider>
      </ProjectsProvider>
    </UserProvider>
  );
}

export default App;
