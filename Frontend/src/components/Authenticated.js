import React, { useState, useEffect, useContext, Fragment } from "react";
import Project from "./Project"
import Sidebar from "./Sidebar";
import MainView from "./MainView";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";
import 

export default function Authenticated() {
    const { user } = useContext(UserContext);
    const [projects, updateProjects] = useContext(ProjectsContext);
    const [boards, setBoards] = useState([]);
    const [message, setMessage] = useState("");
    //   const [displayProjectId, setDisplayProjectId] = useState(null);

    const [currBoard, setcurrBoard] = useState(0);

 // FETCHING PROJECTS
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

  const handleProjectClick = (projectId) => {
      console.log("You've clicked project: ", { id });
      // GET ALL THE BOARDS ASSOCIATED WITH USERID
   
  };

    // GET ALL BOARDS WITH PROJECTID
  const handleBoardClick = (projectId) => {
      console.log("You've clicked board: ", { id });

      const fetchBoards = async (projectId) => { // GET boards associated with projectId
        const data = await fetch(`${url}/project/${projectId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('authCookie'),
          },
        });
        const boardsDatas = await data.json();
        console.log(`BOARDS:`)
        console.log(boardsDatas)
        // console.log(boardsDatas.data.boards)
        if (boardsDatas.error) {
          setMessage(boardsDatas.error);
    
          console.log(boardsDatas.error)
        } else {
          setBoards(boardsDatas.data.boards); // error happend
    
          if (boardsDatas.data.boards.length > 0) {
            setcurrBoard(boardsDatas.data.boards[0]);
          }
        }
        
    }
      fetchBoards(projectId);
      
  };

//   if (projects.length === 0) {
//     updateProjects([{ id: 1, name: "Your project" }]);
//   }
  
  //   const displayProject =
  //     projects.filter((project) => displayProjectId === project.id)[0] ||
  //     DummyProject;

  //   const mainView = <h1>{displayProject.name}</h1>;


  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  return (
      <Fragment>        
        <div>
            <Sidebar
                handleProjectClick={handleProjectClick}
                handleBoardClick={handleBoardClick}
              />
      {/* <MainView /> */}
       </div>
        </Fragment>
  )
}