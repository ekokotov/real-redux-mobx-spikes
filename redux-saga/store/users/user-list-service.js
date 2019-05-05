import axios from 'axios/index';
import http from '../../util/configs/http';
import {loginRedirect} from "../auth/actions";
import store from "../index";

class UserListService {
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

export default new UserListService();
