import {observable, action, reaction} from 'mobx';
import UserListService from '../../services/user-list';

class UsersStore {

  @observable inProgress = false;
  @observable errors;
  @observable limit = 0;
  @observable users = [];

  constructor() {
    reaction(
      () => this.limit,
      this._fetchUsers
    ); // observe request options and refresh user list
  }

  _fetchUsers = () => {
    this.toggleProgress();
    this.setErrors(null);

    return UserListService.getAll(this.limit)
      .then(this.setUsers)
      .catch(this.setErrors)
      .finally(this.toggleProgress)
  };

  @action setErrors = err => {
    this.errors = err;
    if (err) throw err;
  };

  @action setUsers = users => this.users = users;
  @action toggleProgress = () => this.inProgress = !this.inProgress;
  @action setLimit = newLimit => this.limit = parseInt(newLimit, 10);

}

export default new UsersStore();
