import React, {useState} from "react";

export default function SignUp() {
    const [emailValue, setEmailValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    const [error, setErrors] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()

        let signup = await(await fetch(`http://localhost:2053/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: emailValue, password: passwordValue })}
        )).json();

        if(signup.error) {
            setErrors(signup.error)
        }
        setEmailValue("")
        setPasswordValue("")
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
                <div>
                    <label htmlFor="avatarUrl">Avatar URL: </label>
                    <input type="text" id="avatarUrl" value={emailValue} onChange={e => setEmailValue(e.target.value)}></input>
                </div>
                <button onClick={handleSignUp}>Sign Up</button>
                {error ? <p>{error}</p> : null}
            </form>
        </div>
    )
}