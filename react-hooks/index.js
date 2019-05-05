import React from 'react';
import {render} from 'react-dom';
import Routes from './util/routes.js';
import {HashRouter} from 'react-router-dom'
import {StoreProvider} from "./store";

render(
    <StoreProvider>
        <HashRouter>
            <Routes/>
        </HashRouter>
    </StoreProvider>, document.getElementById('root'));
