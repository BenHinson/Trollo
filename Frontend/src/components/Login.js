import React from "react";
import {useState} from "react"

export default function Login() {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [error, setErrors] = useState("")

    const handleLogIn = async (e) => {
        e.preventDefault()
        let login = await(await fetch(`http://localhost:2053/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: emailValue, password: passwordValue })}
        )).json();

        if(login.error) {
            setErrors(login.error)
        } else {
            console.log(login)
        }
    }
   
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" value={emailValue} onChange={e => setEmailValue(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={passwordValue} onChange={e => setPasswordValue(e.target.value)}></input>
                </div>
                <button onClick={handleLogIn}>Log In</button>
                {error ? <p>{error}</p> : null}
            </form>
        </div>
    )
}