import React from 'react';
import {render} from 'react-dom';
import Routes from './routes.js';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));