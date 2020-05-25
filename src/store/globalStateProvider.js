import React, {useReducer,useState} from "react";
import GlobalContext from "../context/globalContext"
const GlobalStore = ({children}) => {
    const isTokenExist = JSON.parse(localStorage.getItem('token')) !== null ? true : false;
    const [isAuth, setIsAuth] = useState(isTokenExist);
    const updateAuth=(auth)=>{
        setIsAuth(auth)
    }
    return (
        <GlobalContext.Provider value={{isAuth, updateAuth: updateAuth}}>
            {children}
        </GlobalContext.Provider>

    )
}
export default GlobalStore;
