import React, {PureComponent, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../actions/users';

class UserList extends PureComponent {
  componentDidMount() {
    this.props.fetchUsers(10);
  }

  render() {
    let {users} = this.props;
    return (
      <Fragment>
        <h1>Users:</h1>
        {users && users.length &&
        <div className="list-group">
          {users.map(user =>
            <a href="#" key={user.email}
               className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{user.username}</h5>
                <small style={{fontSize: '25px'}}><i className={`fas fa-${user.gender}`}/></small>
              </div>
              <small>{user.email}</small>
            </a>)}
        </div>}
      </Fragment>
    )
  }
}

export default connect(state => {
  return {
    users: state.userList.users
  }
}, {fetchUsers})(UserList);