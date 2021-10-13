import React, {useState, Fragment, useEffect} from "react";
// import Board from "./Board";
// import User from "./User";
import Avatar from "./Avatar";
import DummyBoard from "./DummyBoard";
import DummyUser from "./DummyUser";

export default function Project({ user}) {
  const avatar = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
  const dummyMembers = [{ id: 1, name: "Susie", email:"susie@email.com", avatar},{ id: 2, name: "Hugo", email:"hugo@email.com", avatar}, { id: 3, name: "Chris", email:"chris@email.com", avatar }];

  
  const [view, setView] = useState("board")

  const [boardName, setBoardname] = useState("");
  const [projectName, setProjectName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [boardForm, setBoardForm] = useState(false);
  const [projectForm, setProjectForm] = useState(false);
  const [memberForm, setMemberForm] = useState(false);

  const [boards, setBoards] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState(dummyMembers);

  const [projectDropdown, setProjectDropdown] = useState(true);
  const [boardDropdown, setBoardDropdown] = useState(true);
  const [currProject, setcurrProject] = useState(1);


  let url = "http://localhost:2053";

  useEffect(async () => {
    await fetchAllProjects(); // as long as login, user fetches projects
    await fetchBoards(currProject); // fetch board with first Project Id
  }, [])

 // GET FUNCTIONS
  const fetchBoards = async (projectId) => { // GET boards associated with projectId
    const data = await fetch(`${url}/project/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth': user.cookie,
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
            'auth': user.cookie
        }
    })
    const projectsDatas = await data.json();
    setProjects(projectsDatas.data);
    setcurrProject(projectsDatas.data[0].id);
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
        'auth': user.cookie,
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
      setProjects(boardsCopy);
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
        'auth': user.cookie,
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
    }
  
  };
  
  const createMember = async (event) => { // POST new member(NOT SUPPORTED YET)
  }

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

  const showMembers = event => { // SHOW ASSIGNED MEMBERS TO PROJECT (NOT SUPPORTED YET)
    console.log("member open");
    setView("member")
  };

  const dropdownProjects = async (event) => {
    if (projectDropdown) {
      setProjectDropdown(false);
    } else {
      const fetchAllProjects = async () => {
        const data = await fetch(`http://localhost:2053/projects`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth': user.cookie
          }
        });
        const projects = await data.json();
        setProjects(projects.data);
        console.log("PROJECTS:")
        console.log(projects);
      }

      await fetchAllProjects();
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

  const showMemberForm = event => {
     // render a form to create a member
    setMemberForm(true);
  }


  
  // forms to create PROJECT/BOARD/MEMBERS
  const memberform = () => {
    return (
      <div>
        <input placeholder="type an email of member" value={memberEmail} onChange={onChangeMemberEmail} />
        <button onClick={createMember} >+ Invite a member</button>
        <span onClick={closeForm} id="member-form">X</span>
      </div>   
    )
  }

  const projectform = () => {
    return (
      <div>
        <input placeholder="type project name" value={projectName} onChange={onChangeProjectName} />
        <button onClick={createProject} >+ Create a project</button>
        <span onClick={closeForm} id="project-form">X</span>
      </div>   
    )
  }
  
  const boardform = () => {
    return (
      <div>
        <input placeholder="type board name" value={boardName} onChange={onChangeBoardname} />
        <button onClick={createBoard} >+ Create a board</button>
        <span onClick={closeForm} id="board-form">X</span>
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
  
  const onChangeMemberEmail = event => {
    setMemberEmail(event.target.value);
  }
  const onChangeBoardname = event => {
    setBoardname(event.target.value);
  }

  const onChangeProjectName = event => {
    setProjectName(event.target.value);
  }


  
// LIST: BOARDS/MEMBERS/PROJECTS - showing nested elements
// - Project -> show boards / Board -> show Columns
  const listBoards = () => boards.map(board => {
    return (
      <div key={board.id}>
        <p>{board.name}</p>
        <button onClick={deleteBoard} id={ board.id}>Delete</button>
      </div>
    )
  });
  const listMembers = () => dummyMembers.map(member => {
    return (
      <div key={member.id} style={{ display: "inline-block" }} >
        <img src={avatar} style={ {height:"30px", width: "30px", display: "inline-block"}}></img>
      </div>
    )
  });
  const listProjects = () => projects.map(project => {
    return (
      <li onClick={showBoards} key={project.id} >
        <span id={project.id}>{project.name}</span>
        <button onClick={deleteProject} id={ project.id}>Delete</button>
      </li>
    )
  })

 

  return (
    <div style={{ width: "100%", height: "100%" }}>

      <section style={{ width: "20%", height: "100%", display: "inline-block", border: "1px solid grey", textAlign: "center" }}>
        <div>
          <span>avatar</span>
          <span>My Username</span>
        </div>

        <p>
          <span>Projects</span>
          <span onClick={showProjectForm}>+</span>
          <span onClick={dropdownProjects}>dropdown</span>
        </p>

        <ul className="li-projects">
          { projectDropdown && listProjects() }  
        </ul>

        <p>
          <span>Boards (should attach showColumn Fn onclick)</span>
          <span onClick={showBoardForm}>+</span>
          <span onClick={dropdownBoards}>dropdown</span>
        </p>

        <ul className="li-boards">
          { boardDropdown && listBoards() }  
        </ul>

      </section>

      <section style={{ width: "70%", display: "inline-block", textAlign: "center" }}>
        
        {view  &&
          
          <Fragment>
          
            <div>  
              {listMembers()}
              <button onClick={showMemberForm}>Invite</button>
            </div>      
          
          </Fragment>}
        
      </section>

      {boardForm &&
        <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
          {boardform()}
        </section>
      }

      {projectForm &&
        <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
          {projectform()}
        </section>
      }

      {memberForm &&
        <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
          {memberform()}
        </section>
      }

    </div>
  );
}