import React from "react"
import Board from "./Board";
import ProjectMembers from "../ProjectMembers";

export default function MainView({ boardId }) {
    const mainSection = {
        width: "75vw",
        padding: "1rem"
    }
    return (
        <section className="main-view" style={mainSection}>
            {/* <p>Here go project members</p> */}
            {/* <p>Here goes main board</p> */}
            <ProjectMembers />
            <Board />
        </section>
    )
}