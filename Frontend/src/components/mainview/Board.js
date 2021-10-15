import React, { useState } from "react";
import Column from "./Column";

export default function Board({ columnData, projectId, refetchBoard }) {

  const [newColumnName, setNewColumnName] = useState("");

  const addColumn = () => {
    console.log(`Adding new clomun: ${newColumnName}`);
    // TODO: API request goes here
    // TODO: The columnData.length + 1 is a hack, this reassign duplicate ids the second we delete a column
    // setColumnData([
    //   ...columnData,
    //   { name: newColumnName, id: columnData.length + 1 },
    // ]);
  };

  const deleteColumn = (name) => {
    console.log(`delete column`);
    // TODO: API request goes here
    // TODO: Code below is a placholder and will need to be refactored once API is ready
    // setColumnData(columnData.filter((col) => col !== name));
  };

  const columns = columnData.map((column) => {
    return (
      <Column
        key={column.id}
        columnName={column.name}
        deleteColumn={deleteColumn}
        id={column.id}
        tasks={column.tasks}
        projectId={projectId}
        boardId={column.boardId}
        refetchBoard={refetchBoard}
      />
    );
  });

  return (
    <div className="board">
      {columns}
      <div className="newColumn">
        <input
          placeholder="add column"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
        ></input>
        <button onClick={addColumn}>Add Column</button>
      </div>
    </div>
  );
}
