import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import reducers from "./rootReducer";

export default createStore(reducers, compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && window.devToolsExtension()
));