import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Project from './Project';

export default function Authenticated({ user }) {
    let url = "http://localhost:2053";

    const [projects, setProjects] = useState([]);
    const [view, setView] = useState("board");
    const [curPrjId, setCurPrjId] = useState(null);
    
    // Recieve view, curPrjId from Sidebar
    const stateFromSidebar = state => {
        setView(state.view);
        setCurPrjId(state.curPrjId);
    }

    

    useEffect(() => {
        fetchAllProjects();
      }, [])
    
    const fetchAllProjects = async () => {
        const data = await fetch(`http://localhost:2053/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'uid': user.cookie
            }
        })
        const projects = await data.json();
        setProjects(projects.data);
        console.log("PROJECTS:")
        console.log(projects);
        
    }
    return(
        <div style={{ width:"100%", height: "100%"}}>
            {/* <div>
                <p>email: {user.email}</p>
                <p>id: {user.id}</p>
            </div>
            <h1>This is the authenticated route.</h1> */}

            {/* <Project user={ user } /> */}
            {projects && <Sidebar projectList={projects} states={stateFromSidebar} user={user} />}

        </div>
        
    )
}