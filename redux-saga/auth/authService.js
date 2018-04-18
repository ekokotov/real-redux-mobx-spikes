import axios from 'axios';
import http from '../util/configs/http';
import store from '../util/store';
import jwtDecode from 'jwt-decode';
import {authenticate} from './authActions';

const AUTH_TOKEN_PATH = 'auth_token';

class AuthService {
  init = () => {
    const token = this.getToken();
    if (token) store.dispatch(authenticate({user: jwtDecode(token), token}));
  };

  signup = userData => axios.post(http.SIGNUP, userData)
    .then(res => res.data)
    .catch(res => {
      throw res.response.data;
    });

  login = userData => axios.post(http.LOGIN, userData)
    .then(res => res.data)
    .catch(res => {
      throw res.response.data;
    });

  saveToken = token => {
    if (!this.getToken()) localStorage.setItem(AUTH_TOKEN_PATH, token);
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  };

  getToken = () => localStorage.getItem(AUTH_TOKEN_PATH);

  removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN_PATH);
    delete axios.defaults.headers.common.authorization;
  }

}

export default new AuthService();
