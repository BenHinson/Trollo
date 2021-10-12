import { useState } from 'react';

// handle CREATING PROJ & BOARD
export default function Sidebar({ projectList, states, user }) {
    console.log(user);
    const url = "http://localhost:2053";
    const [view, setView] = useState("board")

    const [dropdown, setDropdown] = useState(false);

    const [projectForm, setProjectForm] = useState(false);
    const [boardForm, setBoardForm] = useState(false);
    const [memberForm, setMemberForm] = useState(false);

    // form inputs
    const [boardName, setBoardname] = useState("");
    const [projectName, setProjectName] = useState("");
    const [memberEmail, setMemberEmail] = useState("");

    // data fetched by api
    const [projects, setProjects] = useState(projectList);

    const [curPrjId, setCurPrjId] = useState(null);

    const fetchBoards = async (projectId) => {
        const data = await fetch(`${url}/project/${projectId}`);
        const boards = await data.json();
        // setBoards(boards);
        console.log(boards);
    };

    // const createBoard = async (event) => {
    //     // create a board object.
    //     const board = { id: boardId, name: boardName };
    //     const boardsCopy = [...boards];
    //     // boardsCopy.push(board);
    //     // boardId++;
    //     // setBoards(boardsCopy);
    //     // setBoardForm(false);
    //     console.log('BOARD CREATED: ');
    //     // console.log(dummyBoards)
    //   }
     
    // CREATE Fns THIS THROWS ERROR
      const createProject = async (event) => {
            event.preventDefault()
          const projectsCopy = [...projects];
          console.log(projectName);
          console.log(projectsCopy);
          const response = await fetch(`${url}/project`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'uid': user.cookie,
                  'auth': user.cookie
              },
              body: JSON.stringify({ name: projectName })
          });
          const data = await response.json();
          console.log(data)
        if(data.error) {
            console.log(data.error)
        } else {

            const project = { id: data.id, name: projectName }
            projectsCopy.push(project);
            setProjects(projectsCopy);
        }     
        
      }
    
      const createBoard = async(event) => {
        // create a board object.
        // const board = { id: boardId, name: boardName };
        // const boardsCopy = [...boards];
        // boardsCopy.push(board);
        // boardId++;
        // setBoards(boardsCopy);
        // setBoardForm(false);
        console.log('BOARD CREATED: ');
        // console.log(dummyBoards)
      }
    
      const createMember = event => {
        // const member = members.filter(member => member.email === memberEmail);
        // const projectIdx = projects.findIndex(project => project.id = currProject);
        // const projectsCopy = [...projects];
        // projectsCopy[projectIdx].members.push(member);
        // setProjects(projectsCopy);
      }
      

    // CREATION FORM
    const form = (value, onChange, createFormFn, component) => {
        /* a creation form 
          - changes are tracked by "onChange": either onChangeMemberEmail, onChangeBoardname, onChangeProjectName
          - value is tracked by "value": either memberEmail, boardName, projectName
          - once button is clicked, it triggers "createFormFn": either createBoard, createProject, createMember
          - "component": either "member", "board", "project"
        */
        return (
            <form action='post'>
                <input placeholder={`Add ${component} title`} value={value} onChange={onChange} />
                <button onClick={createFormFn} >Add {component}</button>
                <span onClick={closeForm} id={`${component}-form`}>X</span>
            </form>
        )
    };

    const memberform = () => {
        return (
          <div>
            <input placeholder="type an email of member" value={memberEmail} onChange={onChangeMemberEmail} />
            <button onClick={createMember} >Invite member</button>
            <span onClick={closeForm} id="member-form">X</span>
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
    };
    
    
    const showProjectForm = event => {
        if (boardForm) setBoardForm(false);

        setProjectForm(true);
    };

    const showMemberForm = event => {
        setMemberForm(true);
    };

    const showBoardForm = event => {
        // if "boardForm" sets to true, render a form to create a board
        if (projectForm) setProjectForm(false);
        setBoardForm(true);
      }

    const showProjects = event => {
        console.log("dropdown all projects");
        // toggle dropdown   
        dropdown === true ? setDropdown(false) : setDropdown(true);
    };
    const showBoards = async (event) => {
        console.log("board open");
        console.log(event.target.id);
        setCurPrjId(event.target.id);
        await fetchBoards(curPrjId);
        setView("board")
        
        states({ view, curPrjId });
    };
    const showMembers = async (event) => {
        console.log("member open");
        setView("member")
        
        states({ view, curPrjId });
    };
    
    const onChangeMemberEmail = event => {
        setMemberEmail(event.target.value);
      }
      const onChangeBoardname = event => {
        setBoardname(event.target.value);
      }
    
      const onChangeProjectName = event => {
        setProjectName(event.target.value);
      }
    
    // const listProjects = () => projects.map(project => {
    //     return (
    //         <p onClick={showBoards} key={project.id} id={project.id}>
    //             {project.name}
    //         </p>
    //     )
    // });

    return (
        <section style={{width: "20%", height: "100%", display: "inline-block", border: "1px solid grey", textAlign: "center"}}>
          <p onClick={showProjects}>Projects</p><span onClick={showProjectForm}>+</span>
            {dropdown &&
                <div className="li-projects">
                {projects.map(project =>
                    <p onClick={showBoards} key={project.id} id={project.id}>
                        {project.name}
                    </p>)}
                </div>}
                <p onClick={e => e.target}>Boards</p><span onClick={showBoardForm}>+</span>
            {/* <p onClick={showMembers}>Members</p><span onClick={showMemberForm}>+</span> */}
            
            {boardForm &&
                <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
                    {form(boardName, onChangeBoardname, createBoard, "board")}
                </section>}
            
            {projectForm &&
                <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
                    {form(projectName, onChangeProjectName, createProject, "project")}
                </section>}
            
            {/* {memberForm &&
                <section style={{ position: "absolute", border: "1px solid grey", top: "50vh", left: "50vw" }}>
                    {memberform()}
                </section>} */}

        </section>
  )
}


