import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { ProjectsContext } from "../../ProjectsContext";
import SidebarDropdown from "./SidebarDropdown";
import { sidebar, btnForOthers1, userInfo } from "../../Stylesheet";

export default function Sidebar({
  handleProjectSelect,
  handleBoardSelect,
  handleSubmit,
  boards,
}) {
  const { user, handleLogout } = useContext(UserContext);
  const [projects] = useContext(ProjectsContext);
  // const boards = [{ id: 1, name: "First Board" }];

  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  return (
    <section style={sidebar} className="sidebar">
      <div style={userInfo}>
        <span>
          {/* <Avatar userId={user.id} userData={user } /> */}
          <span>{user.username}</span>
        </span>
        <button onClick={handleLogout} style={btnForOthers1}>
          Logout
        </button>
      </div>
      {/* <h1>{user.name}</h1> */}
      <div style={{ padding: "1rem" }}>
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
      </div>
      <button onClick={logout}>Log Out</button>
    </section>
  );
}

const style = {
  width: 200,
  height: "100%",
  backgroundColor: "aqua",
  padding: 20,
};
