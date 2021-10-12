import React, {useState} from 'react'
import Login from './Login'
import SignUp from './SignUp'

export default function Account() {
    const [accountState, setAccountState] = useState("login")

    return (
        <div>
            <div onChange={e => setAccountState(e.target.value)}>
                <label htmlFor="login">Login</label>
                <input type="radio" name="accountState" id="login" value="login" checked={accountState === 'login'}></input>
                <label htmlFor="signup">Sign Up</label>
                <input type="radio" name="accountState" id="signup" value="signup" checked={accountState === 'signup'}></input>
            </div>
            {accountState === "login" ? <Login></Login> : <SignUp></SignUp>}
        </div>
    )
}