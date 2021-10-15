import React, { createContext, useState } from "react";

export const ProjectsContext = createContext([]);

export function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);

  const updateProjects = (data) => {
    setProjects(data);
  };

  const deleteProject = async (id) => {
    console.log('delete project', id)
    const res = await fetch(`http://localhost:2053/project/${id}`, {
      method: "DELETE",
      headers: { 'auth': localStorage.getItem('authCookie') }
    })
    const resJson = await res.json()
    console.log(resJson)
    setProjects([...projects].filter(p => p.id !== id))
  }

  return (
    <ProjectsContext.Provider value={[projects, updateProjects, deleteProject]}>
      {props.children}
    </ProjectsContext.Provider>
  );
}
