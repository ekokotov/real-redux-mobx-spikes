import {observable, action} from 'mobx';
import UserListService from './userListService';

class UserListStore {

  @observable inProgress = false;
  @observable errors = null;
  @observable limit = 10;

  users = observable([]);

  @action fetchUsers() {
    this.inProgress = true;
    this.errors = null;

    return UserListService.getAll(this.limit)
      .then(action(users => {
        this.users = users;
      }))
      .catch(action(err => {
        this.errors = err;
        throw err;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }))
  }

  @action setLimit(newLimit) {
    this.limit = newLimit;
    this.fetchUsers();
  }
}

export default new UserListStore();