import React from "react";
import {useState} from "react"

export default function Login() {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const handleLogIn = (e) => {
        e.preventDefault()
        console.log(`
        Log In
        email: ${emailValue}
        password: ${passwordValue}`)
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        console.log(`
        Sign Up
        email: ${emailValue}
        password: ${passwordValue}
        `)

        let signup = await(await fetch(`http://localhost:2053/user/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: 'test@example.com', password: 'example'})})).json();
        console.log(signup)
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
                <button onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    )
}