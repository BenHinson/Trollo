import React, { useEffect, useState, useContext } from "react";
import DummyProject from "./dummy/DummyProject";
import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";
import Sidebar from "./sidebar/Sidebar";
import MainView from "./projectview/MainView";

export default function Authenticated() {
  const { user } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  //   const [displayProjectId, setDisplayProjectId] = useState(null);

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
          updateProjects(responseJson.data);
        }
      }
    }
    fetchData();
  }, []);

  const handleProjectClick = (id) => {
    console.log("You've clicked project: ", { id });
    // setDisplayProjectId(id);
  };

  const handleBoardClick = (id) => {
    console.log("You've clicked board: ", { id });
  };

  if (projects.length === 0) {
    updateProjects([{ id: 1, name: "Your project" }]);
  }

  //   const displayProject =
  //     projects.filter((project) => displayProjectId === project.id)[0] ||
  //     DummyProject;

  //   const mainView = <h1>{displayProject.name}</h1>;

  return (
    <div style={style}>
      <Sidebar
        handleProjectClick={handleProjectClick}
        handleBoardClick={handleBoardClick}
      />
      <MainView />
      {/* <div>{mainView}</div> */}
    </div>
  );
}

const style = {
  display: "flex",
};
