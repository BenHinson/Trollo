import React from "react";

import Header from './Header';
import Board from "./Board";

export default function MainView({ columns }) {
  console.log("rendering main view", columns);

  // ! This was a duplicate of the one in 'Board.js'
  // const cols = Object.values(columns).map((column) => {
  //   return (
  //     <div key={column.id}>
  //       <h2>{column.name}</h2>
  //     </div>
  //   );
  // });
  

  // Retrieve tasks for columns
  return (
    <section className="mainView">
      <Header projectName={'Project'} boardName={'Board'} members={['Greg']} />
      <Board columnData={columns}/>
    </section>
  );
}