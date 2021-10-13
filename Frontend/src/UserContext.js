import React, {createContext, useState} from "react"

export const UserContext = createContext([]);

export function UserProvider(props){

    const [user, setUser] = useState({})

    const updateState = (data) => {
        setUser(data)
    }

    const handleLogin = () => {
        // do something
    }

    return (
        <UserContext.Provider value={[user, updateState]}>
            {props.children}
        </UserContext.Provider>
    )
}