import React, { useEffect, useState, useContext } from "react";
import DummyProject from "./DummyProject";
import { UserContext } from "../UserContext";

// const dummyProjects = [
//   { name: "Dummy 1", id: 1 },
//   { name: "Dummy 2", id: 2 },
//   { name: "Dummy 3", id: 3 },
// ];

export default function Authenticated() {
  const { user, handleLogout } = useContext(UserContext);
  const [view, setView] = useState("allProjects");
  const [projectsData, updateProjectsData] = useState([]);

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

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

  //   const projects = projectsData
  //     ? projectsData.map((project) => (
  //         <div key={project.id}>
  //           <h3>{project.name}</h3>
  //         </div>
  //       ))
  //       : "No projects to display";

  const handleProjectClick = (id) => {
    console.log("You've clicked project: ", { id });
  };

  const allProjects = projectsData
    ? projectsData.map((project) => {
        return (
          <button
            onClick={() => handleProjectClick(project.id)}
            key={project.id}
          >
            {project.name}
          </button>
        );
      })
    : "You have no projects";

  //   const projectView = <Project id={null} />;

  return (
    <div>
      <div>
        <p>{user.username}</p>
        <button onClick={logout}>Log Out</button>
      </div>
      {
        view === "allProjects" ? (
          <div>{allProjects}</div>
        ) : (
          <DummyProject id={view}></DummyProject>
        ) // Not sure exactly which props the project component will need
      }
    </div>
  );
}
