import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { ProjectsContext } from "../ProjectsContext";
import SidebarDropdown from "./SidebarDropdown";

export default function Sidebar({ handleProjectSelect, handleBoardSelect, handleSubmit }) {
  const { user, handleLogout } = useContext(UserContext);
  const [projects] = useContext(ProjectsContext);
  const boards = [{ id: 1, name: "First Board" }];

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  return (
    <div style={style}>
      <h1>{user.name}</h1>
      <SidebarDropdown
        name="Projects"
        arr={projects}
        handleSelect={handleProjectSelect} // returns an array of boards
        handleSubmit={handleSubmit}
      />
      <SidebarDropdown
        name="Boards"
        arr={boards} // default 
        handleSelect={handleBoardSelect} // returns a board id 
        handleSubmit={handleSubmit}
      />
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

const style = {
  width: 200,
  height: "100%",
  backgroundColor: "aqua",
  padding: 20,
};