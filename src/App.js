import React from 'react';
import './App.css';
import Routers from "./router/index"
import GlobalStore from "./store/globalStateProvider";
import 'sweetalert2/src/sweetalert2.scss'
function App() {
    return (
        <React.Fragment>
            <GlobalStore>
            <Routers/>
            </GlobalStore>
        </React.Fragment>
    );
}

export default App;
