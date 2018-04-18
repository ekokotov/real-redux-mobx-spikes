import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import usersReducer from '../dashboard/userList/userListReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  userList: usersReducer
});

export default rootReducer;