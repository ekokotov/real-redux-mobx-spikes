import axios from 'axios';
import http from '../util/configs/http';
import {loginRedirect} from "../store/auth/actions";
import store from "../store";

class UserList {
  getAll = count => axios.get(http.USERS, {
    params: {
      count
    }
  }).then(res => res.data)
    .catch(res => {
      if (res.response.status === 403) store.dispatch(loginRedirect('/login'));
      throw res.response.data;
    })
}

export default new UserList();
