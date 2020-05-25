import {Redirect, Route} from "react-router-dom";
import React, {useContext} from "react";
import GlobalContext from "../context/globalContext";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {isAuth} = useContext(GlobalContext)
    return (
        <Route {...rest} render={props =>
            isAuth === true ? <Component {...props}/> : <Redirect
                to={{
                    pathname: "/login",
                }}
            />}>
        </Route>
    )
}

export default ProtectedRoute;
