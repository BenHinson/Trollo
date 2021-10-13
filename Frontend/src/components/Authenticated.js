import React, { useEffect, useState, useContext } from "react";
import DummyProject from "./DummyProject";
import { UserContext } from "../UserContext";

const dummyProjects = [
  { name: "Dummy 1", id: 1 },
  { name: "Dummy 2", id: 2 },
  { name: "Dummy 3", id: 3 },
];

export default function Authenticated() {
  const { user, handleLogout } = useContext(UserContext);
  const [projectsData, setProjectsData] = useState(undefined);
  const [view, setView] = useState("allProjects");

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  useEffect(() => {
    // fetch projects here
    setProjectsData(dummyProjects);
  }, []);

  const projects = projectsData
    ? projectsData.map((project) => (
      <div key={project.id}>
        <h3>{project.name}</h3>
      </div>
    ))
    : "No projects to display";

  return (
    <div>
      <div>
        <p>{user.email}</p>
        <button onClick={logout}>Log Out</button>
      </div>
      {
        view === "allProjects" ? (
          <div>{projects}</div>
        ) : (
          <DummyProject id={view}></DummyProject>
        ) // Not sure exactly which props the project component will need
      }
    </div>
  );
}
