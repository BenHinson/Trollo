import React, { useContext } from "react"
import Account from "./Account"
import Authenticated from "./Authenticated"
import { UserContext } from "../UserContext"

export default function AppWrapper(){
    const [user, updateState] = useContext(UserContext)
  
    const loginUser = (user) => {
      updateState(user);
    }

    if (user && user.username)
    if(Object.keys(user) !== 0){
        return (
            <Account loginUser={loginUser}/>
        )
    }

    return (
        <Authenticated />
    )
}