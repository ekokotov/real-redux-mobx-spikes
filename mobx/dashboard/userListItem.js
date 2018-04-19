import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react/index";

@inject('authStore')
@observer
class UserListItem extends Component {
  render() {
    let {user} = this.props;

    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{user.username}</h5>
          <small style={{fontSize: '25px'}}><i className={`fas fa-${user.gender}`}/></small>
        </div>
        {this.props.authStore.email === user.email && <span className="badge badge-info">You</span>}
        &nbsp;
        <small>{user.email}</small>
      </div>
    )
  }
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['male', 'female', 'Male', 'Female']).isRequired,
  }).isRequired
};

export default UserListItem;