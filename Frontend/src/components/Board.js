import React, { useState } from "react";
import Column from "./Column";

export default function Board() {
  const [columns, setColumns] = useState([
    "column1",
    "column2",
    "column3",
    "column4",
  ]);
  const [newColumnName, setNewColumnName] = useState("");

  const addColumn = () => {
    console.log(`Adding new clomun: ${newColumnName}`);
    // API request goes here
    setColumns([...columns, newColumnName]);
  };

  const deleteColumn = (name) => {
    console.log(`delete column`);
    // API request goes here
    // Code below is a placholder and will need to be refactored once API is ready
    setColumns(columns.filter((col) => col !== name));
  };

  return (
    <div>
      <h2>Project Name</h2>
      <div>
        <input
          placeholder="add column"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        ></input>
        <button onClick={addColumn}>Add Column</button>
      </div>
      {columns.map((column) => {
        return (
          <Column
            columnName={column}
            deleteColumn={deleteColumn}
            id={1}
          ></Column>
        );
      })}
    </div>
  );
}
