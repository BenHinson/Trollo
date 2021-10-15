import React, { useState } from "react";
import Column from "./Column";

export default function Board({ columnData, projectId, refetchBoard, handleAddColumn, handleDeleteColumn }) {

  const [newColumnName, setNewColumnName] = useState("");

  const addColumn = () => {
    // TODO: API request goes here
    // TODO: The columnData.length + 1 is a hack, this reassign duplicate ids the second we delete a column
    // setColumnData([
    //   ...columnData,
    //   { name: newColumnName, id: columnData.length + 1 },
    // ]);
    handleAddColumn(newColumnName)
    setNewColumnName("")
  };


  const columns = columnData.map((column) => {
    return (
      <Column
        key={column.id}
        columnName={column.name}
        handleDeleteColumn={handleDeleteColumn}
        id={column.id}
        tasks={column.tasks}
        projectId={projectId}
        boardId={column.boardId}
        refetchBoard={refetchBoard}
      />
    );
  });
  console.log(columns);
  return (
    <div className="board">
      {columns}

      {columns.length
        ? (
          <div className="newColumn">
            <input
              placeholder="Column Name..."
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
            ></input>
            <button onClick={addColumn}>Add Column</button>
          </div>
        ) : (
          <p className='boardMessage'>Select a Project and a board to see your tasks!</p>
        )
      }

    </div>
  );
}
