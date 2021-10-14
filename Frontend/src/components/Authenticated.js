import React, { useState, useEffect, useContext, Fragment } from "react";
import Project from "./Project";
import Sidebar from "./Sidebar";
import MainView from "./MainView";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";
import ProjectMembers from "./ProjectMembers";

export default function Authenticated() {
  const { user, handleLogout } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const [displayBoard, setDisplayBoard] = useState([]);
  const [message, setMessage] = useState("");

  console.log(boards);
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

  const handleProjectSelect = (id) => {
    console.log("You've clicked project: ", { id });
    // GET ALL THE BOARDS ASSOCIATED WITH USERID
    const fetchBoards = async (projectId) => {
      // GET boards associated with projectId
      const data = await fetch(`http://localhost:2053/project/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("authCookie"),
        },
      });

      const boardsDatas = await data.json();
      console.log(`BOARDS:`);
      console.log(boardsDatas);
      // console.log(boardsDatas.data.boards)
      if (boardsDatas.error) {
        setMessage(boardsDatas.error);

        console.log(boardsDatas.error);
      } else {
        setBoards(boardsDatas.data.boards);

        // if (boardsDatas.data.boards.length > 0) {
        //   setcurrBoard(boardsDatas.data.boards[0]);
        // }
      }
    };
    fetchBoards(id);
    return boards;
  };

  const handleBoardSelect = (id) => {
    console.log("You've clicked board: ", { id });
    const cookie = localStorage.getItem("authCookie");

    const fetchBoard = async (boardId) => {
      // GET boards associated with projectId
      const data = await fetch(`http://localhost:2053/project/${boardId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: cookie,
        },
      });

      const boardResponse = await data.json();

      console.log(`Finished fetching board: ${id}`);
      if (boardResponse.error) {
        setMessage(boardResponse.error);
        console.log(boardResponse.error);
      } else {
        setDisplayBoard(boardResponse.data);
        // if (boardsDatas.data.boards.length > 0) {
        //   setcurrBoard(boardsDatas.data.boards[0]);
        // }
      }
    };
    fetchBoard(id);
    return displayBoard;
  };

  const handleSubmit = (value, formType) => {
    const projectId = 1;
    let urlTail;
    if (formType === "project") {
      urlTail = "/project";
    }
    if (formType === "board") {
      urlTail = `/project/${projectId}/board`;
    }
    if (formType === "member") {
      urlTail = `/project/${projectId}/member`;
    }
    const url = `http:locahost:2053${urlTail}`;

    const createRecord = async () => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("authCookie"),
        },
        body: JSON.stringify({ name: value }),
      });
      const data = await response.json();

      // setProjectName("");
      // setProjectForm(false);
      console.log("Logging response: ", data);

      if (data.error) {
        setMessage(data.error);
        console.log(data.error);
      } else {
        console.log(data.id);
        const record = { id: data.id, name: value };

        if (formType === "project") {
          updateProjects([...projects, record]);
          return;
        }

        if (formType === "boards") {
          setBoards([...boards, record]);
          return;
        }

        // TODO: Will need adjusting because member only receives email
        if (formType === "members") {
          setMembers([...members, record]);
          return;
        }

        return;
        // setProjectForm(false);

        // if (projects.length === 1) setcurrProject(data.id);
      }
    };
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
        <Sidebar
          handleProjectSelect={handleProjectSelect}
          handleBoardSelect={handleBoardSelect}
        />
        {/* <MainView /> */}
    </Fragment>
  );
}
