import axios from 'axios';
import http from '../util/configs/http';
import jwtDecode from 'jwt-decode';

const AUTH_TOKEN_PATH = 'auth_token';

class AuthService {
    getToken() {
        const token = this._getEncodedToken();
        if (token) {
            return {user: jwtDecode(token), token}
        } else return null;
    };

    signup = async userData => {
        try {
            const res = await axios.post(http.SIGNUP, userData);
            return res.data;
        } catch (e) {
            throw e.response.data;
        }
    };

    login = async userData => {
        try {
            const res = await axios.post(http.LOGIN, userData);
            return res.data;
        } catch (e) {
            throw e.response.data;
        }
    };

    saveToken = token => {
        if (!this._getEncodedToken()) localStorage.setItem(AUTH_TOKEN_PATH, token);
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
    };

    _getEncodedToken = () => localStorage.getItem(AUTH_TOKEN_PATH);

    removeToken = () => {
        localStorage.removeItem(AUTH_TOKEN_PATH);
        delete axios.defaults.headers.common.authorization;
    }

}

export default new AuthService();
