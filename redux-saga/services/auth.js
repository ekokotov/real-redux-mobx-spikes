import axios from 'axios';
import http from '../util/configs/http';
import store from '../store';
import jwtDecode from 'jwt-decode';
import {authenticate} from '../store/auth/actions';

const AUTH_TOKEN_PATH = 'auth_token';

class Auth {
    init = () => {
        const token = this.getToken();
        if (token) store.dispatch(authenticate({user: jwtDecode(token), token}));
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

    getToken = () => localStorage.getItem(AUTH_TOKEN_PATH);

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

export default new Auth();
