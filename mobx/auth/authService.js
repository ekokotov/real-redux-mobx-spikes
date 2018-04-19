import axios from 'axios';
import http from '../util/configs/http';
import stores from '../util/store';
import jwtDecode from 'jwt-decode';
const AUTH_TOKEN_PATH = 'auth_token';

class AuthService {
  getToken() {
    const token = this._getEncodedToken();
    if (token) {
      return  {user: jwtDecode(token), token}
    } else return null;
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
    if (!this._getEncodedToken()) localStorage.setItem(AUTH_TOKEN_PATH, token);
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  };

  _getEncodedToken = () =>  localStorage.getItem(AUTH_TOKEN_PATH);

  removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN_PATH);
    delete axios.defaults.headers.common.authorization;
  }

}

export default new AuthService();
