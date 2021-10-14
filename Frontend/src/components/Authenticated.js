import React, { useContext, Fragment } from "react";
import Project from "./Project"

import { UserContext } from "../UserContext";
import SidebarDropdown from "./SidebarDropdown";

export default function Authenticated() {
    const { user } = useContext(UserContext);
    const [projects, updateProjects] = useContext(ProjectsContext);
    const [boards, setBoards] = useState([]);
    const [message, setMessage] = useState("");

    const [currBoard, setcurrBoard] = useState(0);

 // FETCHING PROJECTS
  useEffect(() => {
    async function fetchData() {
      const cookie = localStorage.getItem("authCookie");
      if (cookie && user?.username) {
        const response = await fetch("http://localhost:2053/projects", {
          method: "GET",
          headers: {
            auth: cookie,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const responseJson = await response.json();
          updateProjects(responseJson.data);
        }
      }
    }
    fetchData();
  }, []);

  const handleProjectClick = (projectId) => {
      console.log("You've clicked project: ", { id });
      // GET ALL THE BOARDS ASSOCIATED WITH USERID
   
  };

    // GET ALL BOARDS WITH PROJECTID
  const handleBoardClick = (projectId) => {
      console.log("You've clicked board: ", { id });

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
          setMessage(boardsDatas.error);
    
          console.log(boardsDatas.error)
        } else {
          setBoards(boardsDatas.data.boards); // error happend
    
          if (boardsDatas.data.boards.length > 0) {
            setcurrBoard(boardsDatas.data.boards[0]);
          }
        }
        
    }
      fetchBoards(projectId);
      
  };

//   if (projects.length === 0) {
//     updateProjects([{ id: 1, name: "Your project" }]);
//   }


  const logout = () => {
    console.log("logout");
    handleLogout();
  };

  return (
      <Fragment>        
        <div >
            <Sidebar
                handleProjectClick={handleProjectClick}
                handleBoardClick={handleBoardClick}
              />
      {/* <MainView /> */}
      {/* <div>{mainView}</div> */}
    </div>
          {/* <Project/> */}
    </Fragment>
  );
}
