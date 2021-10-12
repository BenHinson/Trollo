import React, { useState } from "react";
import Column from "./Column";

export default function Board() {
  const [columnData, setColumnData] = useState([
    { name: "To do", id: 1 },
    { name: "In progress", id: 2 },
    { name: "Done", id: 3 },
  ]);
  
  const [newColumnName, setNewColumnName] = useState("");

  const addColumn = () => {
    console.log(`Adding new clomun: ${newColumnName}`);
    // TODO: API request goes here
    // TODO: The columnData.length + 1 is a hack, this reassign duplicate ids the second we delete a column
    setColumnData([
      ...columnData,
      { name: newColumnName, id: columnData.length + 1 },
    ]);
  };

  const deleteColumn = (name) => {
    console.log(`delete column`);
    // TODO: API request goes here
    // TODO: Code below is a placholder and will need to be refactored once API is ready
    setColumnData(columnData.filter((col) => col !== name));
  };

  const columns = columnData.map((column) => {
    return (
      <Column
        columnName={column.name}
        deleteColumn={deleteColumn}
        id={column.id}
      />
    );
  });

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
      {columns}
    </div>
  );
}
