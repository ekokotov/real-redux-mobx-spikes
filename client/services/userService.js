import axios from 'axios';
import http from '../configs/http';

class UserService {
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

export default new UserService();