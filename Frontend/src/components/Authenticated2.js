import React, { useEffect, useContext, useState, Fragment } from "react";
import Sidebar from "./Sidebar";

import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";

export default function Authenticated2() {
  const { user } = useContext(UserContext);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [boards, setBoards] = useState([]);
  const updateBoards = (arr) => {
    setBoards(arr);
  };
  // STEP 1
  const [currProjectId, setCurrProjectId] = useState(1);

  // STEP 2a
  const updateCurrProjectId = (id) => {
    setCurrProjectId(id);
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

  const handleProjectSelect = async (id) => {
    // STEP 2b
    updateCurrProjectId(id);

    const fetchData = async (projectId) => {
      const cookie = localStorage.getItem("authCookie");

      if (cookie && user?.username) {
        const response = await fetch(
          `http://localhost:2053/project/${projectId}`,
          {
            method: "GET",
            headers: {
              auth: cookie,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("This is the response: ", response);

        if (response.status === 200) {
          const responseJson = await response.json();
          console.log("This is the responseJson: ", responseJson);
          const boards = responseJson.data.boards;
          updateBoards(boards);
        }
      }
    };
    console.log("Boards start: ", boards);
    await fetchData(currProjectId);
    console.log("Boards end: ", boards);
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
    console.log("This is the value submitted: ", value);
    console.log("This is the form type submitted: ", formType);
    createRecord(value, formType);
    console.log(value);
    console.log(formType);
  };

  return (
    <Fragment>
      <div>
        <Sidebar
          handleProjectSelect={handleProjectSelect}
          handleBoardSelect={handleBoardSelect}
          handleSubmit={handleSubmit}
          boards={boards}
        />
        {/* <MainView /> */}
      </div>
    </Fragment>
  );
}

const createRecord = async (value, formType, id) => {
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
};
