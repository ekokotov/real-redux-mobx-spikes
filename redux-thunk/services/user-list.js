import axios from 'axios';
import http from '../util/configs/http';

class UserList {
  getAll = count => axios.get(http.USERS, {
    params: {
      count
    }
  })
    .then(res => res.data)
    .catch(res => {
      throw res.response.data
    })
}

export default new UserList();
