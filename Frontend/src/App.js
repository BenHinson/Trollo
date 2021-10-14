import "./Styling/App.css";
import AppWrapper from "./components/AppWrapper";
import { UserProvider } from "./UserContext";
import { ProjectsProvider } from "./ProjectsContext";

export default function App() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <AppWrapper />
      </ProjectsProvider>
    </UserProvider>
  );
}