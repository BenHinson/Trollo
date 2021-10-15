import React, { createContext, useState } from "react";

export const ProjectMembersContext = createContext([]);

export function ProjectMembersProvider(props) {
  const [members, setMembers] = useState([]);

  const updateMembers = (data) => {
    console.log("Updating members context", members);
    setMembers(data);
  };

  return (
    <ProjectMembersContext.Provider value={[members, updateMembers]}>
      {props.children}
    </ProjectMembersContext.Provider>
  );
}
