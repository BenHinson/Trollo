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

  if (membersArray.id) {
    membersArray = [membersArray];
  }

  return (
    <div className='boardHeader'>
      <span className='boardLocation'>
        <p>{projectName}</p>
        <p>{`>`}</p>
        <p>{boardName}</p>
      </span>

      <div className='members'>
        <span className='membersList'>
          {membersArray && membersArray.map((member, i) => {
            return <Avatar size='30' variant="beam" title={member.username} key={i}/>
          })}
        </span>
        {formComponent}
        <button className='memberInviteBtn' onClick={showForm}>Invite</button>
      </div>
    </div>
  );
}