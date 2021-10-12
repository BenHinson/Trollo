import React, {useState} from "react"
import SelectUser from "./SelectUser"

export default function AddTaskModal({ hideModal, addNewTask, columnId }){

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [assignedUser, setAssignedUser] = useState("")

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleDescriptionChange = e => {
        setDescription(e.target.value)
    }

    const handleAssignedUserSelect = e => {
        setAssignedUser(e.target.value)
    }

    const handleSubmit = (e) => {
        // TODO: This is where API call happens and task is created in the database
        const task = {
            columnId,
            name,
            description,
            user: assignedUser
        }

        e.preventDefault()
        addNewTask(task)
        hideModal()
    }

    const handleOutOfFocus = () => {
        // TODO: Implement a way to hide the modal on "click out", so that it doesn't force the user to create a task once open
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input value={name} onChange={handleNameChange} type="text" required></input>
                </label>
                <label>
                    Description:
                    <input value={description} onChange={handleDescriptionChange} type="text" required></input>
                </label>
                <label>
                    Assigned user:
                    <SelectUser assignedUser={assignedUser} handleAssignedUserSelect={handleAssignedUserSelect} />
                </label>
                <button onClick={() => hideModal}>Create new task</button>
            </form>
        </div>
    )
}