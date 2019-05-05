import authReducer from './auth/reducer';
import usersReducer from './users/reducer';

const combineReducers = reducers => (state = {}, action) =>
    Object.keys(reducers).reduce((nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
    }, {});

const reducer = combineReducers({
    auth: authReducer,
    userList: usersReducer
});

export default reducer;
