import React, { createContext, useState } from "react"

export const UserContext = createContext([]);

export function UserProvider(props) {

    const [user, setUser] = useState({})

    const updateState = (data) => {
        setUser(data)
    }

    const handleLogin = (user) => {
        localStorage.setItem("authCookie", user.cookie)
        setUser(user);
    }

    const handleLogout = () => {
        localStorage.removeItem('authCookie')
        setUser({})
    }

    return (
        <UserContext.Provider value={{ user, updateState, handleLogin, handleLogout }}>
            {props.children}
        </UserContext.Provider>
    )
}