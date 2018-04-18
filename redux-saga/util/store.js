import {applyMiddleware, compose, createStore} from "redux";
//import thunkMiddleware from "redux-thunk";
import reducers from "./rootReducer";
import 'regenerator-runtime/runtime';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();

export default createStore(reducers, compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension && window.devToolsExtension()
));

sagaMiddleware.run(rootSaga);
