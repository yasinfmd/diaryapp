import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GlobalStore from "./store/globalStateProvider";

ReactDOM.render(
    <React.StrictMode>
        <GlobalStore>
            <App/>
        </GlobalStore>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();
