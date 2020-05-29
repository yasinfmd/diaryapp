import React, {useContext, useEffect} from 'react';
import {withRouter} from "react-router-dom"
import './App.css';
import 'sweetalert2/src/sweetalert2.scss'
import "moment/locale/tr"
import GlobalContext from "./context/globalContext";
import Routers from "./router/index"
function App() {
   /* const {initAuth} = useContext(GlobalContext)
    useEffect(() => {
        console.log("selam")
    /!*    initAuth()*!/
    }, [])*/
    return (
        <React.Fragment>
                <Routers/>
        </React.Fragment>
    );
}

export  default withRouter(App)
