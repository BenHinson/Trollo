import React, {useState} from "react";

export default function SignUp({ setAccountLogin }) {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [avatarValue, setAvatarValue] = useState("");
    const [message, setMessage] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault()
        let signup = await(await fetch(`http://localhost:2053/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: emailValue, password: passwordValue, avatar: avatarValue })}
        )).json();

        if(signup.error) {
            setMessage(signup.error)
        } else {
            setMessage("Account created successfully");
            setAccountLogin(true);
        }
        setEmailValue("")
        setPasswordValue("")
        setAvatarValue("")
    }
    return (
        <div>
            <input name='email' placeholder='Email...' onChange={e => setEmailValue(e.target.value)}></input>
            <input name='password' type='password' placeholder='Password...' onChange={e => setPasswordValue(e.target.value)}></input>

            {message ? <p>{message}</p> : <p></p>}

            <button className='navBtn submitAccountBtn' onClick={handleSignUp}>Create Account</button>
                    
            <button className='navBtn navBtnInv switchFormBtn' onClick={() => {setAccountLogin(true)}}>Already have an account</button>
        </div>
    )
}