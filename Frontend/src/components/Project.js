import React, {useState, Fragment, useEffect} from "react";
// import Board from "./Board";
// import User from "./User";
import DummyBoard from "./DummyBoard";
import DummyUser from "./DummyUser";

export default function Project({ user }) {
  console.log(user);
  const dummyBoardsArr = [{id:1, name: "boardname1" }, {id:2, name: "boardname2" }];
  const dummyMembers = [{ id: 1, name: "Susie", email:"susie@email.com" },{ id: 2, name: "Hugo", email:"hugo@email.com" }, { id: 3, name: "Chris", email:"chris@email.com" }];
  const dummyProjects = [{ id: 1, name: "project-1", members: [] }, { id: 2, name: "project-2", members:[] }];
  
  const [view, setView] = useState("board")

  const [boardName, setBoardname] = useState("");
  const [projectName, setProjectName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [boardForm, setBoardForm] = useState(false);
  const [projectForm, setProjectForm] = useState(false);
  const [memberForm, setMemberForm] = useState(false);

  const [boards, setBoards] = useState(dummyBoardsArr);
  const [projects, setProjects] = useState(dummyProjects);
  const [members, setMembers] = useState(dummyMembers);

  const [dropdown, setDropdown] = useState(false);
  const [currProject, setcurrProject] = useState(1);

  let boardId = 3;
  let projectId = 3;
  let memberId = 4;
  let url = "http://localhost:2053";

//   useEffect(() => {
//     fetchAllProjects();
//   })

// const fetchAllProjects = async () => {
//     const data = await fetch(`http://localhost:2053/projects`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'uid': user.cookie
//         }
//     })
//     const projects = await data.json();
//     console.log("PROJECTS:")
//     console.log(projects);
// }
 
  const fetchBoards = async (projectId) => {
    const data = await fetch(`${url}/project/${projectId}`);
    const boards = await data.json();
    // setBoards(boards);
    console.log(boards);
  }

  const postProject = async () => {
    
  }

  const showProjects = event => {
    console.log("dropdown all projects");
    // toggle dropdown
    
    dropdown === true ? setDropdown(false) : setDropdown(true);

  }

  const showBoards = async (event) => {
    console.log("board open");
    console.log(event.target.id);
    setcurrProject(event.target.id);
    await fetchBoards(currProject);
    setView("board")
  };

  const showMembers = event => {
    console.log("member open");
    setView("member")
  };

  const showBoardForm = event => {
    // if "boardForm" sets to true, render a form to create a board
    setBoardForm(true);
  }

  const showProjectForm = event => {
    setProjectForm(true);
  }

  const showMemberForm = event => {
    setMemberForm(true);
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
  
  // forms to create PROJECT/BOARD/MEMBERS
  const memberform = () => {
    return (
      <div>
        <input placeholder="type an email of member" value={memberEmail} onChange={onChangeMemberEmail} />
        <button onClick={createMember} >Invite member</button>
        <span onClick={closeForm} id="member-form">X</span>
      </div>   
    )
  }


  const form = (value, onChange, createFormFn, component) => {
    /* a creation form 
      - changes are tracked by "onChange": either onChangeMemberEmail, onChangeBoardname, onChangeProjectName
      - value is tracked by "value": either memberEmail, boardName, projectName
      - once button is clicked, it triggers "createFormFn": either createBoard, createProject, createMember
      - "component": either "member", "board", "project"
    */
    return (
      <div>
        <input placeholder={`Add ${component} title`} value={value} onChange={ onChange} />
        <button onClick={createFormFn} >Add { component}</button>
        <span onClick={closeForm} id={`${component}-form`}>X</span>
      </div>     
    )
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

  const createBoard = async(event) => {
    // create a board object.
    const board = { id: boardId, name: boardName };
    const boardsCopy = [...boards];
    // boardsCopy.push(board);
    // boardId++;
    // setBoards(boardsCopy);
    // setBoardForm(false);
    console.log('BOARD CREATED: ');
    // console.log(dummyBoards)
  }
 
  const createProject = event => {
    const project = { id: projectId, name: projectName };
    const projectsCopy = [...projects];
    projectsCopy.push(project);
    setProjects(projectsCopy);
  }
  
  const createMember = event => {
    const member = members.filter(member => member.email === memberEmail);
    const projectIdx = projects.findIndex(project => project.id = currProject);
    const projectsCopy = [...projects];
    projectsCopy[projectIdx].members.push(member);
    setProjects(projectsCopy);
  }

  const deleteBoard = event => {
    // MIND THE TYPE
    const boardId = parseInt(event.target.id);

    const removeItem = boards.filter(board => board.id !== boardId);
    setBoards(removeItem);
 }

  const listBoards = () => boards.map(board => {
    return (
      <div key={board.id}>
        <DummyBoard name={board.name} />
        <button onClick={deleteBoard} id={ board.id}>Delete</button>
      </div>
    )
  });
  const listMembers = () => dummyMembers.map(member => <DummyUser key={member.id} name={member.name} />);
  const listProjects = () => projects.map(project => <p onClick={showBoards} key={project.id} id={ project.id}>{ project.name}</p>)


  return (
    <div style={{ width:"100%", height: "100%"}}>
      <section style={{width: "20%", height: "100%", display: "inline-block", border: "1px solid grey", textAlign: "center"}}>
        <p onClick={showProjects}>Projects</p><span onClick={showProjectForm}></span>
        { dropdown && <div className="li-projects">{listProjects()}</div> }   
        
        <p onClick={showMembers}>Members</p>
      </section>

      <section style={{width: "70%", display:"inline-block", textAlign: "center"}}>
        {view === "board" && <Fragment><button onClick={showBoardForm}>+</button>{listBoards()}</Fragment>}
        {view === "member" && <Fragment><button onClick={showMemberForm}>+</button>{listMembers()}</Fragment>}
      </section>
      {boardForm && <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>{form(boardName, onChangeBoardname, createBoard, "board")}</section>}
      {projectForm && <section style={ {position: "absolute", border: "1px solid grey", top:"50vh", left: "50vw" }}>{form(projectName, onChangeProjectName, createProject, "project")}</section>}
      {memberForm && <section style={ {position: "absolute", border: "1px solid grey", top:"50vh", left: "50vw" }}>{memberform()}</section>}

    </div>
  );
}
