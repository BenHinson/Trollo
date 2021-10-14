import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { ProjectsContext } from "../../ProjectsContext";
import SidebarDropdown from "./SidebarDropdown";

export default function Sidebar({ handleProjectClick, handleBoardClick }) {
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
        handleClick={handleProjectClick}
      />
      <SidebarDropdown
        name="Boards"
        arr={boards}
        handleClick={handleBoardClick}
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
