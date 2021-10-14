import React, { useEffect, useContext, useState, Fragment } from "react";
import Sidebar from "./sidebar/Sidebar";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";

export default function Authenticated() {
  const { user } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [boards, setBoards] = useState([]);
  const [currProjectId, setCurrProjectId] = useState(1);

  // Artificial state variable to trigger refetch of boards on adding a new board via the form.
  // It increments in handleSubmit and fetching the boards depends on the value change.
  const [counter, setCounter] = useState(0);

  const updateBoards = (arr) => {
    setBoards(arr);
  };

  const updateCurrProjectId = (id) => {
    setCurrProjectId(id);
  };

  const updateCounter = () => {
    setCounter(counter + 1);
  };

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

  // FETCHING BOARDS
  useEffect(() => {
    fetchBoardsData(currProjectId, updateBoards, user);
  }, [counter]);

  const handleProjectSelect = async (id) => {
    updateCurrProjectId(id);
    await fetchBoardsData(currProjectId, updateBoards, user);
  };

  const handleBoardSelect = (id) => {
    console.log("You've clicked board: ", { id });
    //   const cookie = localStorage.getItem("authCookie");

    //   const fetchBoard = async (boardId) => {
    //     // GET boards associated with projectId
    //     const data = await fetch(`http://localhost:2053/project/${boardId}`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         auth: cookie,
    //       },
    //     });

    //     const boardResponse = await data.json();

    //     console.log(`Finished fetching board: ${id}`);
    //     if (boardResponse.error) {
    //       setMessage(boardResponse.error);
    //       console.log(boardResponse.error);
    //     } else {
    //       setDisplayBoard(boardResponse.data);
    //       // if (boardsDatas.data.boards.length > 0) {
    //       //   setcurrBoard(boardsDatas.data.boards[0]);
    //       // }
    //     }
    //   };
    //   fetchBoard(id);
    //   return displayBoard;
  };

  const handleSubmit = (value, formType) => {
    createRecord(value, formType, currProjectId);
    updateCounter();
  };

  return (
    <div style={sideLayout}>
      <Sidebar
        handleProjectSelect={handleProjectSelect}
        handleBoardSelect={handleBoardSelect}
        handleSubmit={handleSubmit}
        boards={boards}
      />
    </div>
  );
}

const sideLayout = { display: "flex", height: "100vh" };

async function fetchBoardsData(projectId, updateCB, user) {
  const cookie = localStorage.getItem("authCookie");

  if (cookie && user?.username) {
    const response = await fetch(`http://localhost:2053/project/${projectId}`, {
      method: "GET",
      headers: {
        auth: cookie,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const responseJson = await response.json();
      const boards = responseJson.data.boards;
      updateCB(boards);
    }
  }
}

async function createRecord(value, formType, id) {
  let url = "";

  if (formType === "Projects") {
    url = "http://localhost:2053/project";
  }

  if (formType === "Boards") {
    url = `http://localhost:2053/project/${id}/board`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth: localStorage.getItem("authCookie"),
    },
    body: JSON.stringify({ name: value }),
  });
}
