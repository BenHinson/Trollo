import React, { useContext } from "react";
import {ProjectMembersContext} from '../../ProjectsMembersContext';

import Header from "./Header";
import Board from "./Board";

export default function MainView({ columns, projectId, refetchBoard, currProjectId }) {
  const [members, updateMembers] = useContext(ProjectMembersContext)

  const handleSubmit = async (value, formType) => {
    await addMember(value, currProjectId);
    console.log(value)
  };

  // POST /project/:projectId/member
  async function addMember(value, id) {
    const response = await fetch(`http://localhost:2053/project/${id}/member`, {
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

  return (
    <section className="mainView">
      <Header
        projectName={'Project'}
        boardName={'Board'}
        membersArray={members}
        handleSubmit={handleSubmit}
        currProjectId={currProjectId}
      />
      <Board columnData={columns} projectId={projectId} refetchBoard={refetchBoard}/>
    </section>
  );
}
