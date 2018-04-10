import axious from 'axios';
import http from '../configs/http';

const AUTH_TOKEN_PATH = 'auth_token';

class AuthService {
  signup(userData) {
    return axious.post(http.SIGNUP, userData)
      .then(res => res.data)
  }

  login(userData) {
    return axious.post(http.LOGIN, userData)
      .then(res => res.data)
  }

  saveToken(token) {
    localStorage.setItem(AUTH_TOKEN_PATH, token);
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN_PATH);
  }


}

export default new AuthService()