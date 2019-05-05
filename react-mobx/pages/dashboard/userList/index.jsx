import React, {Component, Fragment} from 'react';
import LimitInput from '../../../components/limitInput';
import {inject, observer} from 'mobx-react';
import UserListItem from './userListItem';
import Alert from '../../../components/alert';

@inject('userListStore', 'authStore')
@observer
class UserList extends Component {

  componentWillMount() {
    this.loadUsers(10);
  }

  loadUsers = limit => this.props.userListStore.setLimit(limit);

  showError = (e) => <Alert message={e.error} type="danger"/>;

  showUsers(inProgress, users) {
    return (<Fragment>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Users: <span className={inProgress ? '' : 'invisible'}>
                  <i className="fas fa-sync fa-spin"/>
                </span></h1>
          </div>

          <div className="col">
            <LimitInput limit={this.props.userListStore.limit} values={[1, 5, 10, 25, 50]} select={this.loadUsers}/>
          </div>
        </div>
      </div>
      {
        users && users.length &&
        <div className="list-group">
          {users.map(user => <UserListItem key={user.email} user={user}/>)}
        </div>
      }
    </Fragment>)
  }

  render() {
    let {inProgress, users, errors} = this.props.userListStore;
    return errors ? this.showError(errors) : this.showUsers(inProgress, users);
  }
}

export default UserList;
