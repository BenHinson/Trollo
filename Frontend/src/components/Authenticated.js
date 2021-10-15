import React, { useEffect, useContext, useState, Fragment } from "react";
import Sidebar from "./sidebar/Sidebar";
import MainView from "./mainview/MainView";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";

import '../Styling/main.css';


export default function Authenticated() {
  const { user } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [boards, setBoards] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currProjectId, setCurrProjectId] = useState(null);
  const [currBoardId, setCurrBoardId] = useState(null);

  // Artificial state variable to trigger refetch of boards on adding a new board via the form.
  // It increments in handleSubmit and fetching the boards depends on the value change.
  const [counter, setCounter] = useState(0);

  const updateColumns = (arr) => {
    setColumns(arr);
  };

  const updateBoards = (arr) => {
    setBoards(arr);
  };

  const updateCurrProjectId = (id) => {
    setCurrProjectId(id);
  };

  const updateCurrBoardId = (id) => {
    setCurrBoardId(id);
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
    console.log("Fetching data");
    fetchData();
  }, [counter]);

  // FETCHING BOARDS
  useEffect(() => {
    fetchBoardsData(currProjectId, updateBoards, user);
  }, [counter]);

  useEffect(() => {
    fetchColumnsData(currBoardId, updateColumns, user, currProjectId);
  }, [counter]);

  const handleProjectSelect = async (id) => {
    updateCurrProjectId(id);
    await fetchBoardsData(id, updateBoards, user);
  };

  const handleBoardSelect = async (id) => {
    updateCurrBoardId(id);
    await fetchColumnsData(id, updateColumns, user, currProjectId);
  };

  const handleSubmit = async (value, formType) => {
    await createRecord(value, formType, currProjectId);
    updateCounter();
  };

  return (
    <div className='main'>
      <Sidebar
        handleProjectSelect={handleProjectSelect}
        handleBoardSelect={handleBoardSelect}
        handleSubmit={handleSubmit}
        boards={boards}
      />
      <MainView columns={columns} />
    </div>
  );
}


async function fetchBoardsData(projectId, updateCB, user) {
  const cookie = localStorage.getItem("authCookie");

  if (cookie && user?.username && projectId) {
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

async function fetchColumnsData(boardId, updateCB, user, projectId) {
  const cookie = localStorage.getItem("authCookie");

  if (cookie && user?.username && boardId) {
    const response = await fetch(
      `http://localhost:2053/project/${projectId}/board/${boardId}`,
      {
        method: "GET",
        headers: {
          auth: cookie,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const responseJson = await response.json();
      const columns = responseJson.data.columns;
      console.log(
        "Fetched columns for board id",
        boardId,
        "Project id:",
        projectId,
        columns
      );
      updateCB(columns);
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
