import React, { useContext } from "react";

import Header from './Header';
import Board from "./Board";


export default function MainView({ columns, projectId, refetchBoard, currProjectId }) {
  // const [members, updateMembers] = useContext(ProjectMembersContext)
  console.log(members);
  console.log("rendering main view", columns);
  let members = [{"id": 1,"email": "example@example.com","username": "example","avatar": null}]


  return (
    <section className="mainView">
      <Header projectName={'Project'} boardName={'Board'} members={members} />
        <Board columnData={columns} projectId={projectId} refetchBoard={refetchBoard}/>
    </section>
  );
}