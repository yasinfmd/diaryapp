import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import WithRouterApp from "./App";
import * as serviceWorker from './serviceWorker';
import GlobalStore from "./store/globalStateProvider";
/*import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';*/
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
