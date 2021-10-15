import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { ProjectsContext } from "../../ProjectsContext";
import SidebarDropdown from "./SidebarDropdown";
import UserInfo from "./UserInfo";
import { sidebar, btnForOthers1, userInfo } from "../../Styling/Stylesheet";

export default function Sidebar({
  handleProjectSelect,
  handleBoardSelect,
  handleSubmit,
  boards,
}) {
  const { user, handleLogout } = useContext(UserContext);
  const [projects, _, deleteProject] = useContext(ProjectsContext);

  return (
    <section className="sidebar">
      <UserInfo handleLogout={handleLogout} user={user} />

      <div className='projectBoardDropdown'>
        <SidebarDropdown
          name="Projects"
          arr={projects}
          handleSelect={handleProjectSelect} // returns an array of boards
          handleSubmit={handleSubmit}
          handleDelete={deleteProject}
        />
        <SidebarDropdown
          name="Boards"
          arr={boards} // default
          handleSelect={handleBoardSelect} // returns a board id
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}