import React from "react"
import Task from "./Task"

export default function Column({columnName, deleteColumn}){
    return (
        <div>
            <h3>{columnName}</h3>
            <Task />
            <button onClick={() => deleteColumn(columnName)}>delete column</button>
        </div>
    )
}