import {observable, action, reaction} from 'mobx';
import UserListService from './userListService';

class UserListStore {

  @observable inProgress = false;
  @observable errors = null;
  @observable limit = 0;
  @observable users = [];

  fetchUsers = reaction (
    () => (this.limit),
    limit => this._fetchUsers()
  ); // observe load options and load user list

  @action _fetchUsers() {
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

  @action changeLimit(newLimit) {
    this.limit = parseInt(newLimit, 10);
  }
}

export default new UserListStore();
