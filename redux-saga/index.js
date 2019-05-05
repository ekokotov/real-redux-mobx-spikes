import React from 'react';
import {render} from 'react-dom';
import Routes from './util/routes.js';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <HashRouter>
      <Routes/>
    </HashRouter>
  </Provider>, document.getElementById('root'));
