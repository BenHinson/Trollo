import React, { createContext, useState } from "react";

export const ProjectsContext = createContext([]);

export function ProjectsProvider(props) {
  const [projects, setProjects] = useState([]);

  const updateProjects = (data) => {
    setProjects(data);
  };

  return (
    <ProjectsContext.Provider value={[projects, updateProjects]}>
      {props.children}
    </ProjectsContext.Provider>
  );
}
