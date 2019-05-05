import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import usersReducer from './users/reducer';

const reducer = combineReducers({
  auth: authReducer,
  userList: usersReducer
});

export default reducer;
