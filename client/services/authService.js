import axious from 'axios';
import http from '../configs/http';
import store from '../store';
import jwtDecode from 'jwt-decode';
import {authenticate} from '../actions/auth';
const AUTH_TOKEN_PATH = 'auth_token';

class AuthService {
  init() {
    const token = this.getToken();
    if (token) store.dispatch(authenticate({user: jwtDecode(token)}));
  }

  signup(userData) {
    return axious.post(http.SIGNUP, userData)
      .then(res => res.data)
  }

  login(userData) {
    return axious.post(http.LOGIN, userData)
      .then(res => res.data)
  }

  saveToken(token) {
    if (!this.getToken()) localStorage.setItem(AUTH_TOKEN_PATH, token);
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_PATH);
  }

  removeToken() {
    return localStorage.removeItem(AUTH_TOKEN_PATH);
  }

}

export default new AuthService();