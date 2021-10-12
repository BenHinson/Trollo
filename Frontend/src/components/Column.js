import React, { useState } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";

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
      avatar:
        "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    },
    2: {
      id: 2,
      name: "Jenny",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png",
    },
    3: {
      id: 3,
      name: "Gabriel",
      avatar:
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
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
    <div style={style}>
      <h3>{columnName}</h3>
      <button onClick={() => deleteColumn(columnName)}>➖ Delete column</button>
      {tasks}
      <button onClick={addTaskButtonClick}>➕ Add task</button>
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

// style for development
const style = {
  width: "25%",
  padding: 20,
  margin: 10,
  borderStyle: "solid",
  borderWidth: 2,
  borderColor: "red",
};
