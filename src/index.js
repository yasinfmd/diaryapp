import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import WithRouterApp from "./App";
import * as serviceWorker from './serviceWorker';
import GlobalStore from "./store/globalStateProvider";
/*import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/';*/
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
        <GlobalStore>
           <WithRouterApp/>
        </GlobalStore>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();
