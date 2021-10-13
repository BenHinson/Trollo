import React, { useEffect, useState, useContext } from "react";
import DummyProject from "./DummyProject";
import { UserContext } from "../UserContext";

export default function Authenticated() {
  const { user, handleLogout } = useContext(UserContext);
  const [projectsData, updateProjectsData] = useState([]);
  const [displayProjectId, setDisplayProjectId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const cookie = localStorage.getItem("authCookie");
      if (cookie && user?.username) {
        const response = await fetch("http://localhost:2053/projects", {
          method: "GET",
          headers: {
            auth: cookie,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const responseJson = await response.json();
          updateProjectsData(responseJson.data);
        }
      }
    }
    fetchData();
  }, []);

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  const handleProjectClick = (id) => {
    console.log("You've clicked project: ", { id });
    setDisplayProjectId(id);
  };

  const allProjects =
    projectsData.length > 0 ? (
      projectsData.map((project) => {
        return (
          <button
            onClick={() => handleProjectClick(project.id)}
            key={project.id}
          >
            {project.name}
          </button>
        );
      })
    ) : (
      <p>No own created projects</p>
    );

  const displayProject =
    projectsData.filter((project) => displayProjectId === project.id)[0] ||
    DummyProject;

  const mainView = <h1>{displayProject.name}</h1>;

  return (
    <div>
      <p>{user.username}</p>
      <button onClick={logout}>Log Out</button>
      <div>{allProjects}</div>
      <div>{mainView}</div>
    </div>
  );
}
