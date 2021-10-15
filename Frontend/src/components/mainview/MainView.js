import React, { useContext } from "react";

import Header from './Header';
import Board from "./Board";

export default function MainView({ columns, projectId, refetchBoard, currProjectId }) {
  console.log("rendering main view", columns);
  const members = [{ "id": 1, "email": "example@example.com", "username": "example", "avatar": null }]
  console.log("rendering main view", columns);
  console.log(currProjectId)

  const handleSubmit = async (value, formType) => {
    await addMember(value, currProjectId);
    console.log(value)
  };

  // POST /project/:projectId/member
  async function addMember(value, id) {
    let url = `http://localhost:2053/project/${id}/member`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("authCookie"),
      },
      body: JSON.stringify({ email: value }),
    });
    console.log(response)
    if (response.status === 200) {
       // Add member to members
      
    }
  }



  // Retrieve tasks for columns
  return (
    <section className="mainView">
      <Header
        projectName={'Project'}
        boardName={'Board'}
        members={members}
        handleSubmit={handleSubmit}
        currProjectId={currProjectId}
      />
      <Board columnData={columns} projectId={projectId} refetchBoard={refetchBoard}/>
    </section>
  );
}