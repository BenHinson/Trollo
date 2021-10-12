import React, {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default function Account({loginUser}) {
    const [accountState, setAccountState] = useState("login")
    const [message, setMessage] = useState("")

    return (
        <div>
            <div>
                <label htmlFor="login">Login</label>
                <input type="radio" name="accountState" id="login" value="login" onChange={e => setAccountState(e.target.value)} checked={accountState === 'login'}></input>
                <label htmlFor="signup">Sign Up</label>
                <input type="radio" name="accountState" id="signup" value="signup" onChange={e => setAccountState(e.target.value)} checked={accountState === 'signup'}></input>
            </div>
            {accountState === "login" ? 
            <Login loginUser={loginUser} setMessage={setMessage}></Login> : 
            <SignUp setAccountState={setAccountState} setMessage={setMessage}></SignUp>}
            {message ? <p>{message}</p> : null}
        </div>
    )
}