import {Redirect, Route} from "react-router-dom";
import React, {useContext, useEffect} from "react";
import GlobalContext from "../context/globalContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {isAuth, initAuth} = useContext(GlobalContext)
    useEffect(() => {
        alert("ben rotayım")
        initAuth()
    }, [])
    return (
        <Route {...rest} render={(props) => {
            return (isAuth === true ? <Component {...props}/> : <Redirect
                to={{
                    pathname: "/login",
                }}
            />)
        }
        }>
        </Route>
    )
}

export default ProtectedRoute;
