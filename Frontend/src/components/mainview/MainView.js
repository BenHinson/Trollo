import React, {useContext} from "react";

// import ProjectMembers from "../ProjectMembers";

import Header from './Header';
import Board from "./Board";


export default function MainView({ columns, projectId, refetchBoard, currProjectId }) {
  console.log("rendering main view", columns);
  const members = [{"id": 1,"email": "example@example.com","username": "example","avatar": null}]


  return (
    <section className="mainView">
      <Header projectName={'Project'} boardName={'Board'} members={members} />
        <Board columnData={columns} projectId={projectId} refetchBoard={refetchBoard}/>
    </section>
  );
}