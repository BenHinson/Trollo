import React, { useState } from "react"
import Task from "./Task"
import AddTaskModal from "./AddTaskModal"

const tasksArr = [{columnId: 1, name: "Take out the trash", description: "Quickly!"}, {columnId: 2, name: "Brush teeth", description: "Properly!"}]

export default function Column({id, columnName, deleteColumn}){

    // boolean to control whether to pop up a modal for creating a new task
    const [addTaskModalVisible, setAddTaskModalVisible] = useState(false)

    const tasks = tasksArr.filter((task) => {
        return task.columnId === id
    }).map((task) => {
        <Task name={task.name} description={task.description}/>
    })

    const addTaskButtonClick = () => {
        setAddTaskModalVisible(true)
    }

    const hideModal = () => {
        setAddTaskModalVisible(false)
    }

    return (
        <div>
            <h3>{columnName}</h3>
            <button onClick={() => deleteColumn(columnName)}>➖ Delete column</button>
            {tasks}
            <button onClick={addTaskButtonClick}>➕ Add task</button>
            {addTaskModalVisible && <AddTaskModal hideModal={hideModal}/>}
        </div>
    )
}