import React, {useReducer, useState} from "react";
import GlobalContext from "../context/globalContext"

const GlobalStore = ({children}) => {
    const isTokenExist = JSON.parse(localStorage.getItem('token')) !== null ? true : false;
    const [isAuth, setIsAuth] = useState(isTokenExist);
    const isUserExist = JSON.parse(localStorage.getItem("token")) !== null ? JSON.parse(localStorage.getItem('token')) : null
    const [user, setUser] = useState(isUserExist)
    const updateAuth = (auth) => {
        setIsAuth(auth)
    }

    const updateUser = (user) => {
        setUser(user)
    }
    return (
        <GlobalContext.Provider value={{
            isAuth,
            updateAuth: updateAuth,
            user: user,
            updateUser: updateUser
        }}>
            {children}
        </GlobalContext.Provider>

    )
}
export default GlobalStore;
