import React, {Component, Fragment} from 'react';
import LimitInput from '../common/limitInput';
import {inject, observer} from 'mobx-react/index';
import userListStore from './userListStore';
import UserListItem from './userListItem';

@inject('userListStore', 'authStore')
@observer
class UserList extends Component {

  componentDidMount() {
    this.props.userListStore.fetchUsers();
  }

  setLimit = limit => this.props.userListStore.setLimit(limit);

  render() {
    let {inProgress, users} = this.props.userListStore;
    let currentUser = this.props.authStore.user;

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Users: <span className={inProgress ? '' : 'invisible'}>
                  <i className="fas fa-sync fa-spin"/>
                </span></h1>
            </div>

            <div className="col">
              <LimitInput limit={this.props.limit} values={[1, 5, 10, 25, 50]} select={this.setLimit}/>
            </div>
          </div>
        </div>
        {
          users && users.length &&
          <div className="list-group">
            {users.map(user => <UserListItem key={user.email} user={user}/>)}
          </div>
        }
      </Fragment>
    )
  }
}

export default UserList;
