import React, { useContext, useState } from "react";
import { ProjectsContext } from '../../ProjectsContext';
import Form from '../Form'
import Avatar from "boring-avatars"

export default function Header({ projectName, boardName, currProjectId, handleSubmit, membersArray=[]}) {
  // console.log(members);
  // const [members, setMembers] = useState([]);
  const [projects, updateProjects] = useContext(ProjectsContext);
  const [formVisibility, setFormVisibility] = useState(false);

  const showForm = () => {
    console.log("Showing form");
    setFormVisibility(true);
  };

  const hideForm = () => {
    console.log("Hiding form");
    setFormVisibility(false);
  };

  const formComponent = formVisibility && (
    <Form handleSubmit={handleSubmit} hideForm={hideForm} formType="Members" />
  );

  console.log(projects);
  console.log(currProjectId);
  console.log(projectName);
  console.log(boardName);

  return (
    <div className='boardHeader'>
      <span className='boardLocation'>
        <p>{projectName}</p>
        <p>{`>`}</p>
        <p>{boardName}</p>
      </span>

      <div className='members'>
        <span className='membersList'>
          {membersArray.map((member) => {
            return <Avatar size='30' variant="beam" title={member.username}/>
          })}
        </span>
        <button className='memberInviteBtn' onClick={showForm}>Invite</button>
      </div>
      {formComponent}
    </div>
  );
}