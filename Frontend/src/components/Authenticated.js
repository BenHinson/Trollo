import React, { useEffect, useContext, useState, Fragment } from "react";
import Sidebar from "./sidebar/Sidebar";
import MainView from "./mainview/MainView";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";
import { ProjectMembersContext } from "../ProjectsMembersContext";

import "../Styling/main.css";

export default function Authenticated() {
  const { user } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [boards, setBoards] = useState([]);
  const [columns, setColumns] = useState([]);
  const [members, updateMembers] = useContext(ProjectMembersContext);
  const [currProjectId, setCurrProjectId] = useState(null);
  const [currBoardId, setCurrBoardId] = useState(null);
  const [currProjectData, setCurrProjectData] = useState(null);

  // Artificial state variable to trigger refetch of boards on adding a new board via the form.
  // It increments in handleSubmit and fetching the boards depends on the value change.
  const [counter, setCounter] = useState(0);


  const updateColumns = (obj) => {
    const cols = Object.values(obj);
    setColumns(cols);
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
    fetchData();
  }, [counter]);

  // FETCHING BOARDS
  useEffect(() => {
    fetchBoardsData(currProjectId, updateBoards, user, updateMembers);
  }, [counter]);

  useEffect(() => {
    fetchColumnsData(currBoardId, updateColumns, user, currProjectId);
  }, [counter]);

  const handleProjectSelect = async (id) => {
    updateCurrProjectId(id);
    await fetchBoardsData(id, updateBoards, user, updateMembers);
    updateCounter();
  };

  const handleBoardSelect = async (id) => {
    updateCurrBoardId(id);
    await fetchColumnsData(id, updateColumns, user, currProjectId);
  };

  const handleSubmit = async (value, formType) => {
    await createRecord(value, formType, currProjectId);
    updateCounter();
  };

  const handleDeleteBoard = async (id) => {
    console.log("delete board", id)
    console.log(currProjectId, id)
    const res = await fetch(`http://localhost:2053/project/${currProjectId}/board/${id}`, {
      method: 'DELETE',
      headers: { "auth": localStorage.getItem('authCookie') }
    })
    setBoards([...boards].filter(b => b.id !== id))
  }

  const handleAddColumn = async (name) => {
    console.log("addcolumn: ", name)
    const res = await fetch(`http://localhost:2053/project/${currProjectId}/board/${currBoardId}/column`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        'auth': localStorage.getItem('authCookie')
      },
      body: JSON.stringify({ name })
    })
    const resJson = await res.json()
    const newCol = resJson.data
    newCol.tasks = []
    setColumns([...columns, newCol])
  }

  return (
    <div className="main">
      <Sidebar
        handleProjectSelect={handleProjectSelect}
        handleBoardSelect={handleBoardSelect}
        handleSubmit={handleSubmit}
        handleDeleteBoard={handleDeleteBoard}
        boards={boards}
      />

      <MainView
        columns={columns}
        handleAddColumn={handleAddColumn}
        projectId={currProjectId}
        refetchBoard={() => updateCounter()}
        currProjectId={currProjectId}
      />
    </div>
  );
}

async function fetchBoardsData(projectId, updateBoards, user, updateMembers) {
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
      const members = responseJson.data.members;
      console.log("Fetched members", members);
      updateMembers(members);
      updateBoards(boards);
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
      // columns comes in like this {1: {column}, 2: {column}} and needs to be an array [{column, {column}}]
      const formattedColumns = Object.values(columns)
      console.log(
        "Fetched columns for board id",
        boardId,
        "Project id:",
        projectId,
        columns
      );
      updateCB(formattedColumns);
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
