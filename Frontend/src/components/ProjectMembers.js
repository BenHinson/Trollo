import React, { useContext, Fragment, useState } from "react";
import UserAvatar from "./mainview/UserAvatar";

import { UserContext } from "../UserContext";

import {
    btnForOthers1,
    btnForOthers2,
    btnForDelete,
    modal,
    modalCloseBtn
  } from '../Styling/Stylesheet';

export default function ProjectMembers({currentProjId}) {
    // const avatar = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    const { user } = useContext(UserContext);
    // const dummyMembers = [{ id: 1, name: "Susie", email:"susie@email.com", avatar},{ id: 2, name: "Hugo", email:"hugo@email.com", avatar}, { id: 3, name: "Chris", email:"chris@email.com", avatar }];
    const [members, setMembers] = useState([]);
    const [memberForm, setMemberForm] = useState(false);
    const [memberEmail, setMemberEmail] = useState("");
    const [message, setMessage] = useState("");

    const url = "http://localhost:2053";
    
    // GET FUNCTION
    const showMembers = event => { // SHOW ASSIGNED MEMBERS TO PROJECT (NOT SUPPORTED YET)
            // fetch members
        console.log("member open");

    };
    
    // POST FUNCTION
    const addMember = async (event) => { // POST new member(NOT SUPPORTED YET)
        const memberToAdd = {email: memberEmail}
        const response = await fetch(`${url}/project/${currentProjId}/member`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem("authCookie")
            },
            body: JSON.stringify(memberToAdd)
        });
        const data = await response.json();
        
        setMemberEmail("");
        closeForm();
        console.log(`MEMBER: `);
        console.log(data);

        if (data.error) {

            setMessage(data.error)
            console.log(message)
         
        } else {
             // Logic on front-end layer
            const membersCopy = [...members];
            membersCopy.push(membersCopy)
            setMembers(membersCopy);
        }
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
            <button onClick={addMember} style={btnForOthers2}>+ Invite a member</button>
            <span onClick={closeForm} id="member-form" style={modalCloseBtn}>X</span>
          </div>   
        )
    }
    
    const errorMessage = () => {
        return (
            <div style={{...modal, ...ErrorM}}>
                <div style={{margin: "1rem"}}>{message}</div>
                <button onClick={messageCleanup} style={btnForOthers2}>OK</button>
            </div>   
        )
    }

    const messageCleanup = () => {
        setMessage("");
    }
    
    const onChangeMemberEmail = event => {
        setMemberEmail(event.target.value);
      }
    
    const listMembers = () => members.map(member => {
        return (
            <div key={member.id} style={{ display: "inline-block" }} >
                <userAvatar userId={user.id} userData={user} />
            {/* <img src={avatar} style={ {height:"30px", width: "30px", display: "inline-block"}}></img> */}
        </div>
        )
    });
    
    // STYLES

    const locatingUsers = {
        position: "absolute",
        top: "0",
        right: "0",
        padding: "1rem"
    }

    const locatingForm = {
        position: "absolute",top: "50vh", left: "30vw" 
    }
    const ErrorM = {
        top: "-50vh",
        right: "-30vw",
        width: "400px",
        textAlign: "center"
    }

    return (
      <Fragment>
        <section style={{ width: "70%", display: "inline-block", textAlign: "center" }}>
        
            {currentProjId !== 0 &&      
            <div style={locatingUsers}>
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

            {message.length > 0 && errorMessage()}
        </Fragment>
  );
}