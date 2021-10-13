import React, { useContext, Fragment, useState } from "react";

import { UserContext } from "../UserContext";

import {
    btnForOthers1,
    btnForOthers2,
    btnForDelete,
    sidebar,
    sideBarBtns,
    modal,
    modalCloseBtn
  } from '../Stylesheet';

export default function ProjectMembers({currentProjId}) {
    const avatar = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"

    const { user, handleLogout } = useContext(UserContext);
    const dummyMembers = [{ id: 1, name: "Susie", email:"susie@email.com", avatar},{ id: 2, name: "Hugo", email:"hugo@email.com", avatar}, { id: 3, name: "Chris", email:"chris@email.com", avatar }];
    const [members, setMembers] = useState(dummyMembers);
    const [memberForm, setMemberForm] = useState(false);
    const [memberEmail, setMemberEmail] = useState("");

    const showMembers = event => { // SHOW ASSIGNED MEMBERS TO PROJECT (NOT SUPPORTED YET)
            // fetch members
        console.log("member open");

    };

    const createMember = async (event) => { // POST new member(NOT SUPPORTED YET)
    }
    
    const showMemberForm = event => {
        // render a form to create a member
       setMemberForm(true);
    }

    const closeForm = e => {
        setMemberForm(false)
    }

    const memberform = () => {
        return (
          <div style={modal}>
            <input placeholder="type an email of member" value={memberEmail} onChange={onChangeMemberEmail} />
            <button onClick={createMember} style={btnForOthers2}>+ Invite a member</button>
            <span onClick={closeForm} id="member-form" style={modalCloseBtn}>X</span>
          </div>   
        )
      }
    
    const onChangeMemberEmail = event => {
        setMemberEmail(event.target.value);
      }
    
  const listMembers = () => dummyMembers.map(member => {
    return (
      <div key={member.id} style={{ display: "inline-block" }} >
        <img src={avatar} style={ {height:"30px", width: "30px", display: "inline-block"}}></img>
      </div>
    )
  });
    
    const locatingUsers = {
        position: "absolute",
        top: "0",
        right: "0",
        padding: "1rem"
    }

    const locatingForm = {
        position: "absolute",top: "50vh", left: "30vw" 
      }

    return (
      <Fragment>
        <section style={{ width: "70%", display: "inline-block", textAlign: "center" }}>
        
            {currentProjId !== 0 &&      
            <div style={locatingUsers }>
                {listMembers()}
                <button onClick={showMemberForm} style={btnForOthers2}>Invite</button>
                </div>      
            }
            
            </section>
            
        {memberForm &&
            <section style={locatingForm}>
              {memberform()}
            </section>
        }
        </Fragment>
  );
}