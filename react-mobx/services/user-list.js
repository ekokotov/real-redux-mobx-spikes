import axios from 'axios/index';
import http from '../util/configs/http';
import store from "../store";

class UserList {
  getAll = count => axios.get(http.USERS, {
    params: {
      count
    }
  }).then(res => res.data)
    .catch(e => {
      //if (res.response.status === 403) store.authStore.logout();
      throw e.response.data;
    })
}

export default new UserList();
