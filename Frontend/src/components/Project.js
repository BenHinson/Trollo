import React, { useState, Fragment, useEffect, useContext } from "react";

import {UserContext} from '../UserContext';
import {
  btnForOthers1,
  btnForOthers2,
  btnForDelete,
  sidebar,
  sideBarBtns,
  modal,
  modalCloseBtn
} from '../Stylesheet';
// import Board from "./Board";
// import User from "./User";
import DummyBoard from "./DummyBoard";
import DummyUser from "./DummyUser";
import ProjectMembers from "./ProjectMembers";

// FETCH USER to get avatar url to pass into Avatar
export default function Project() {

  const { user, handleLogout } = useContext(UserContext);
  // console.log(user.id)  
  const [view, setView] = useState("board")

  const [boardName, setBoardname] = useState("");
  const [projectName, setProjectName] = useState("");
  // const [memberEmail, setMemberEmail] = useState("");

  const [boardForm, setBoardForm] = useState(false);
  const [projectForm, setProjectForm] = useState(false);
  // const [memberForm, setMemberForm] = useState(false);

  const [boards, setBoards] = useState([]);
  const [projects, setProjects] = useState([]);

  const [projectDropdown, setProjectDropdown] = useState(true);
  const [boardDropdown, setBoardDropdown] = useState(true);
  const [currProject, setcurrProject] = useState(0);


  const url = "http://localhost:2053";
  console.log(user)

  useEffect(async () => {
    await fetchAllProjects(); // as long as login, user fetches projects
    if (projects.length !== 0) {
      await fetchBoards(currProject); // fetch board with first Project Id
    }
  }, [])

 // GET FUNCTIONS
  const fetchBoards = async (projectId) => { // GET boards associated with projectId
    const data = await fetch(`${url}/project/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('authCookie'),
      },
    });
    const boardsDatas = await data.json();
    console.log(`BOARDS:`)
    console.log(boardsDatas)
    // console.log(boardsDatas.data.boards)
    if (boardsDatas.error) {
      console.log(boardsDatas.error)
    } else {
      setBoards(boardsDatas.data.boards);
    }
    
  }

  const fetchAllProjects = async () => {
    const data = await fetch(`${url}/projects`, { // GET projects
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth': localStorage.getItem('authCookie')
        }
    })
    const projectsDatas = await data.json();
    setProjects(projectsDatas.data);
    
    if (projectsDatas.data.length !== 0) {
      setcurrProject(projectsDatas.data[0].id);
    }
    console.log(`currProjectID: ${currProject}`);
    console.log("PROJECTS:")
    console.log(projectsDatas);
    
}  


// POST FUNCTIONS
  const createBoard = async (event) => { // POST new board
    const boardsCopy = [...boards];

    const response = await fetch(`${url}/project/${currProject}/board`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('authCookie'),
      },
      body: JSON.stringify({ name: boardName })
    });
    const data = await response.json();
    
    console.log(data)

    if (data.error) {
      console.log(data.error)
    } else {

      const board = { id: data.id, name: boardName }
      boardsCopy.push(board);
      setBoards(boardsCopy);
      setBoardForm(false)
    }
  }
 
  const createProject = async (event) => { // POST new project
    console.log(projects)
    const projectsCopy = [...projects];
    console.log(projectsCopy)
    // console.log(projectName);

    const response = await fetch(`${url}/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth': localStorage.getItem('authCookie'),
      },
      body: JSON.stringify({ name: projectName })
    });
    const data = await response.json();
    
    console.log(data)

    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.id)
      const project = { id: data.id, name: projectName }
      projectsCopy.push(project);
      setProjects(projectsCopy);
      setProjectForm(false);
    }
    
  };

  // DELETE FUNCTIONS
  const deleteBoard = async (event) => {
    // MIND THE TYPE
    const boardId = parseInt(event.target.id);

    const removeItem = boards.filter(board => board.id !== boardId);
    setBoards(removeItem);
  }
  const deleteProject = event => {}


  // Showing actual datas - onClick attached in each LIST variables e.g listSomething()
  const showBoards = async (event) => {
    console.log("board open");
    console.log(event.target.id);
    console.log(event)
    setcurrProject(event.target.id);
    await fetchBoards(currProject);
    setView("board")
  };

  const dropdownProjects = async (event) => {
    if (projectDropdown) {
      setProjectDropdown(false);
    } else {
        setProjectDropdown(true);
      }

      console.log(`dropdown: ${projectDropdown}`)      
    }

    
  

  const dropdownBoards = async (event) => {
    // on true, fetch Columns
    boardDropdown ? setBoardDropdown(false) : setBoardDropdown(true);
    console.log(`boardDropdown: ${boardDropdown}`)
  }

  // RENDERING MODAL FORM
  const showBoardForm = event => {
    // render a form to create a board
    setBoardForm(true);
  }

  const showProjectForm = event => {
     // render a form to create a project
    setProjectForm(true);
  }

  // forms to create PROJECT/BOARD
  const projectform = () => {
    return (
      <div style={modal}>
        <input placeholder="type project name" value={projectName} onChange={onChangeProjectName} />
        <button onClick={createProject} style={btnForOthers2 }>+ Create Project</button>
        <span onClick={closeForm} id="project-form" style={modalCloseBtn}>X</span>
      </div>   
    )
  }
  
  const boardform = () => {
    return (
      <div style={modal}>
        <input placeholder="type board name" value={boardName} onChange={onChangeBoardname} />
        <button onClick={createBoard} style={btnForOthers2 }>+ Create a board</button>
        <span onClick={closeForm} id="board-form" style={modalCloseBtn}>X</span>
      </div>   
    )
  }

  const closeForm = e => {
    switch (e.target.id) {
      case "board-form":
        setBoardForm(false);
      case "project-form":
        setProjectForm(false);
    }
    console.log(e.target.id)
  }
  
  const onChangeBoardname = event => {
    setBoardname(event.target.value);
  }

  const onChangeProjectName = event => {
    setProjectName(event.target.value);
  }


  
// LIST: BOARDS/PROJECTS - showing nested elements
// - Project -> show boards / Board -> show Columns
  const listBoards = () => boards.map(board => {
    return ( // showColumns should be added
      <li key={board.id} style={{...divideIn2, ...projectAndboardList}}>
        <span>{board.name}</span>
        <button onClick={deleteBoard} id={board.id} style={btnForDelete}>Delete</button>
      </li>
    )
  });

  const listProjects = () => projects.map(project => {
    return (
      <li onClick={showBoards} key={project.id} style={{...divideIn2, ...projectAndboardList}}>
        <span id={project.id}>{project.name}</span>
        <button onClick={deleteProject} id={project.id} style={ btnForDelete}>Delete</button>
      </li>
    )
  })

 

  const divideIn2 = {
    display: "flex",
    justifyContent: "space-between"
  }

  const projectAndboardList = {
    fontWeight: "normal",
    padding: "0.2rem"
  }

  const locatingForm = {
    position: "absolute",top: "50vh", left: "30vw" 
  }

  const userInfo = {
    borderBottom: "2px solid #b1becc",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between"
}

  return (
    <div style={{ width: "100%", height: "100%" }}>
      
      <section style={sidebar}>
        <div style={userInfo}>
          <span>
            {/* <Avatar userId={user.id} userData={user } /> */}
            <span>{user.username}</span>
          </span>     
          <button onClick={handleLogout} style={btnForOthers1}>Logout</button>
        </div>
        
        <div style={ {padding:"1rem"}}>
        <p style={divideIn2}>
            <span>Projects</span>
            <span>
              <span onClick={dropdownProjects} style={sideBarBtns}>
                {projectDropdown ? `˄` : `˅`}
              </span>
              <span onClick={showProjectForm} style={sideBarBtns}>+</span>     
            </span>
        </p>

        <ul className="li-projects">
          { projectDropdown && listProjects() }  
        </ul>

          <p style={divideIn2}>
          {/* (should attach showColumn Fn onclick) */}
            <span>Boards </span> 
            <span>
              <span onClick={dropdownBoards} style={sideBarBtns}>
              {boardDropdown ? `˄` : `˅`}
              </span>
              <span onClick={showBoardForm} style={sideBarBtns}>+</span>
          </span>
        </p>

        <ul className="li-boards">
          { boardDropdown && listBoards() }  
        </ul>

        </div>
        
      </section>

    
      {currProject !== 0 && <ProjectMembers currentProjId={currProject} />}
      

      {boardForm &&
        <section style={locatingForm}>
          {boardform()}
        </section>
      }

      {projectForm &&
        <section style={locatingForm}>
          {projectform()}
        </section>
      }

    </div>
  );
}
