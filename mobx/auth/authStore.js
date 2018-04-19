import {observable, action} from 'mobx';
import AuthService from './authService';

class AuthStore {
  constructor (data) {
    const userIdentity = AuthService.getToken();
    if (userIdentity) this.setAuth(userIdentity);
  };

  @observable inProgress = false;
  @observable errors = undefined;
  @observable token = null;
  @observable user = null;

  @action setAuth({user, token}) {
    this.user = user;
    this.token = token;
    AuthService.saveToken(token);
  }

  @action resetUser() {
    this.user = null;
  }

  @action resetToken() {
    this.token = null;
  }

  @action signUp = userData => this._authRequest(AuthService.signup, userData);
  @action login = userData => this._authRequest(AuthService.login, userData);

  @action _authRequest(method, userData) {
    this.inProgress = true;
    this.errors = undefined;

    return method(userData)
      .then(action(userData => this.setAuth(userData)))
      .catch(action(err => {
        this.errors = err;
        throw err;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }

  @action logout() {
    this.user = null;
    this.token = null;
    AuthService.removeToken();
  }
}

export default new AuthStore();