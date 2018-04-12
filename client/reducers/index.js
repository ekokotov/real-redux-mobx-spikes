import { combineReducers } from 'redux';
import authReducer from './auth';
import usersReducer from './users';

const rootReducer = combineReducers({
  auth: authReducer,
  userList: usersReducer
});

export default rootReducer;