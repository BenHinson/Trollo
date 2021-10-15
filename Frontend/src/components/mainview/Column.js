import React, { useState } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import {
  column as col,
  btnForDelete,
  btnForOthers1,
} from "../../Styling/Stylesheet";

export default function Column({
  id,
  columnName,
  deleteColumn,
  tasks,
  projectId,
  boardId,
  refetchBoard,
  handleDeleteColumn
}) {
  // boolean to control whether to pop up a modal for creating a new task
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  // find tasks of this colum
  let counter = 1000;
  const taskComponents = tasks.map((task) => {
    counter++;
    console.log("Task is assigned to: ", task.assigned);
    return (
      <Task
        key={counter}
        name={task.name}
        description={task.description}
        userId={task.assigned}
      />
    );
  });

  const addTaskButtonClick = () => {
    setAddTaskModalVisible(true);
  };

  const hideModal = () => {
    setAddTaskModalVisible(false);
  };

  const createNewTask = async (task) => {
    const url = `http://localhost:2053/project/${projectId}/board/${boardId}/column/${id}/task`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("authCookie"),
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        assigned: task.assigned,
      }),
    });

    console.log("New task record has been created", await response.json());
    console.log(task);
    await refetchBoard();
  };

  return (
    <div className="column">
      <div className="columnHeader">
        <h5>{columnName}</h5>
        <span>
          <button onClick={addTaskButtonClick}>＋</button>
          <button onClick={() => handleDeleteColumn(id)}>✕</button>
        </span>
      </div>

      <div className="columnTasks">
        {taskComponents}

        {addTaskModalVisible && (
          <AddTaskModal
            hideModal={hideModal}
            createNewTask={createNewTask}
            columnId={id}
          />
        )}
      </div>
    </div>
  );
}
