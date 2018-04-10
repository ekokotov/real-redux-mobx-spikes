import React from 'react';
import {render} from 'react-dom';
import Routes from './routes.js';
import {BrowserRouter} from 'react-router-dom'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';

const store = createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && window.devToolsExtension()
));

render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));