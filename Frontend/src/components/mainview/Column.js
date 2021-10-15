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
}) {

  //TODO: Prop drilling userData for now, nasty practice, but it'll get solved with API calls
  const [userData] = useState({
    1: {
      id: 1,
      name: "Ben",
      avatar: "",
    },
    2: {
      id: 2,
      name: "Jenny",
      avatar: "https://source.boringavatars.com/beam/20",
    },
    3: {
      id: 3,
      name: "Gabriel",
      avatar: "https://source.boringavatars.com/beam/3",
    },
  });

  // boolean to control whether to pop up a modal for creating a new task
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  // find tasks of this colum
  const taskComponents = tasks.map((task) => {
    return (
      <Task
        // This key is not right, it'll be duplicate
        key={task.assigned}
        name={task.name}
        description={task.description}
        userData={userData}
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
    // TODO: This is where API call happens to create a new task in the database
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
    await refetchBoard()
  };

  return (
    <div className='column'>
      <div className='columnHeader'>
        <h5>{columnName}</h5>
        <span>
          <button onClick={() => deleteColumn(columnName)}>✕</button>
          <button onClick={addTaskButtonClick}>+</button>
        </span>
      </div>

      {taskComponents}

      {addTaskModalVisible && (
        <AddTaskModal
          userData={userData}
          hideModal={hideModal}
          createNewTask={createNewTask}
          columnId={id}
        />
      )}
    </div>
  );
}
