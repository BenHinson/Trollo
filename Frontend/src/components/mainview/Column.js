import React, { useState } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import {
  column as col,
  btnForDelete,
  btnForOthers1,
} from "../../Styling/Stylesheet";

export default function Column({ id, columnName, deleteColumn }) {
  const [taskData, setTaskData] = useState([
    {
      columnId: 1,
      name: "Take out the trash",
      description: "Quickly!",
      userId: 1,
    },
    { columnId: 2, name: "Brush teeth", description: "Properly!", userId: 2 },
    {
      columnId: 3,
      name: "Do the dishes",
      description: "Sparkling clean!",
      userId: 3,
    },
  ]);

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
  const tasks = taskData
    .filter((task) => {
      return task.columnId === id;
    })
    .map((task) => {
      return (
        <Task
          key={task.userId}
          name={task.name}
          description={task.description}
          userData={userData}
          userId={task.userId}
        />
      );
    });

  const addTaskButtonClick = () => {
    setAddTaskModalVisible(true);
  };

  const hideModal = () => {
    setAddTaskModalVisible(false);
  };

  const createNewTask = (task) => {
    // TODO: This is where API call happens to create a new task in the database
    setTaskData([...taskData, task]);
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
      {tasks}

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
