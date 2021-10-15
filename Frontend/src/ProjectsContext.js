import React, { createContext, useState } from "react";

export const ProjectsContext = createContext([]);

export function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);

  const updateProjects = (data) => {
    setProjects(data);
  };

  const deleteProject = async (id) => {
    console.log('delete project', id)
  }

  return (
    <ProjectsContext.Provider value={[projects, updateProjects, deleteProject]}>
      {props.children}
    </ProjectsContext.Provider>
  );
}
