import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SIGNUP_FAILED, SIGNUP_START} from './action-types';
import React from "react";
import Auth from "../../services/auth";

export const initialState = {
  currentUser: Auth.authenticate(),
  inProgress: false,
};

function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        currentUser: action.payload.user,
      };

    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        currentUser: null,
        errors: action.errors
      };

    case LOGOUT:
      return {
        ...state,
        inProgress: false,
        currentUser: null,
      };

    default:
      return state
  }
}

export default reduce;
