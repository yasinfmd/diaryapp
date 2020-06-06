import React, {useState} from "react";
import GlobalContext from "../context/globalContext"
import {useHistory} from "react-router-dom";
import {msgBox} from "../utils/appmsgbox";
import appmsg from "../utils/appmsg";

const GlobalStore = ({children}) => {
    let history = useHistory();
    const isTokenExist = JSON.parse(localStorage.getItem('token')) !== null ? true : false;
    const [isAuth, setIsAuth] = useState(isTokenExist);
    const isUserExist = JSON.parse(localStorage.getItem("user")) !== null ? JSON.parse(localStorage.getItem('user')) : null
    const [user, setUser] = useState(isUserExist)
    const setExpiresin = (time) => {
        setTimeout(() => {
            msgBox("info", appmsg.globalstate.sessionend)
            logout();
        }, time)
    }
    const updateAuth = (auth) => {
        setIsAuth(auth)
    }
    const updateUser = (user) => {
        setUser(user)
    }
    const logout = () => {
        localStorage.clear()
        updateAuth(false)
        updateUser(null)
    }
    const initAuth = () => {
        if (JSON.parse(localStorage.getItem("token")) && JSON.parse(localStorage.getItem("user")) && localStorage.getItem("expirationDate")) {
            let expiration = localStorage.getItem("expirationDate")
            let time = new Date().getTime()
            if (time > +expiration) {
                logout()
                console.log("süre geçti")
                msgBox("info", appmsg.globalstate.sessionend)
            } else {
                const second = +expiration - time
                setExpiresin(second)
                setIsAuth(true)
                setUser(JSON.parse(localStorage.getItem("user")))
            }

        } else {
            logout()
        }
    }
    return (
        <GlobalContext.Provider value={{
            isAuth,
            updateAuth: updateAuth,
            user: user,
            updateUser: updateUser,
            initAuth: initAuth,
            logout: logout,
            setExpiresin: setExpiresin
        }}>
            {children}
        </GlobalContext.Provider>

    )
}
export default GlobalStore;
