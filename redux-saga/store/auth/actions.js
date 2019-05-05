import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_START, SIGNUP_FAILED} from './action-types';

export const login = userData => ({type: LOGIN_START, user: userData});
export const loginError = errors => ({type: LOGIN_FAILED, errors});
export const loginRedirect = page => ({type: 'LOGIN_REDIRECT', page});

export const authenticate = ({user, token}) => ({type: LOGIN_SUCCESS, user, token});
export const logout = () => ({type: LOGOUT});

export const signup = newUser => ({type: SIGNUP_START, user: newUser});
export const signupError = errors => ({type: SIGNUP_FAILED, errors});
