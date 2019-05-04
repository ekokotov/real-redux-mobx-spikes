import React from 'react';
import {render} from 'react-dom';
import Routes from './util/routes.js';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'mobx-react';
import stores from './util/store';
import { configure } from 'mobx';

configure({ enforceActions: "observed" });

render(
  <Provider {...stores}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </Provider>, document.getElementById('root'));

