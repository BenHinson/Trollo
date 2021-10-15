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
  let counter = 1000;
  const taskComponents = tasks.map((task) => {
    counter++;
    return (
      <Task
        // This key is not right, it'll be duplicate
        key={counter}
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
    <article style={col}>
      <h5>{columnName}</h5>
      <button onClick={() => deleteColumn(columnName)} style={btnForDelete}>
        −
      </button>
      <button onClick={addTaskButtonClick} style={btnForOthers1}>
        +
      </button>
      {taskComponents}

      {addTaskModalVisible && (
        <AddTaskModal
          userData={userData}
          hideModal={hideModal}
          createNewTask={createNewTask}
          columnId={id}
        />
      )}
    </article>
  );
}
