import React, { useContext } from "react";
import {ProjectMembersContext} from '../../ProjectsMembersContext';

import Header from './Header';
import Board from "./Board";

export default function MainView({ columns, projectId, refetchBoard, currProjectId }) {
  const [members, updateMembers] = useContext(ProjectMembersContext);

  return (
    <section className="mainView">
      <Header projectName={'Project'} boardName={'Board'} membersArray={members} />
      <Board columnData={columns} projectId={projectId} refetchBoard={refetchBoard} />
    </section>
  );
}