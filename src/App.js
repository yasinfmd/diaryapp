import React, {useContext, useEffect} from 'react';
import './App.css';
import 'sweetalert2/src/sweetalert2.scss'
import "moment/locale/tr"
import GlobalContext from "./context/globalContext";
import Routers from "./router/index"
function App() {
    const {initAuth} = useContext(GlobalContext)
    useEffect(() => {
        initAuth()
    }, [])
    return (
        <React.Fragment>
                <Routers/>
        </React.Fragment>
    );
}
export default App;
