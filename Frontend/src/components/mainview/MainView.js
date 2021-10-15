import React, {useContext} from "react";

// import ProjectMembers from "../ProjectMembers";

import Header from './Header';
import Board from "./Board";

export default function MainView({ columns, currProjectId }) {
  console.log("rendering main view", columns);
  // On a click on board, retrieve columns for given board

  const members = [{"id": 1,"email": "example@example.com","username": "example","avatar": null}]


  return (
    <section className="mainView">
      <Header projectName={'Project'} boardName={'Board'} membersArray={members} />
      <Board columnData2={columns}/>
    </section>
  );
}