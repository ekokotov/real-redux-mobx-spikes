import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchUsers, setFetchingLimit} from '../../../store/users/actions';
import LimitInput from "../../../components/limitInput";

class Index extends Component {
  selectLimit = newLimit => this.props.setFetchingLimit(newLimit);

  state = {
    users: []
  };

  componentDidMount() {
    this.props.fetchUsers(this.props.limit);
  }

  render() {
    let {currentUser, isLoading, users, errors} = this.props;
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>Users: <span className={isLoading ? '' : 'invisible'}>
                  <i className="fas fa-sync fa-spin"/>
                </span></h1>
            </div>

            <div className="col">
              <LimitInput limit={this.props.limit} values={[1, 5, 10, 25, 50]} select={this.selectLimit}/>
            </div>
          </div>
        </div>

        {users && users.length && <div className="list-group">

          {users.map(user =>
            <a href="#" key={user.email}
               className="list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{user.username}</h5>
                <small style={{fontSize: '25px'}}><i className={`fas fa-${user.gender}`}/></small>
              </div>
              {currentUser.email === user.email && <span className="badge badge-info">You</span>}
              &nbsp;
              <small>{user.email}</small>
            </a>)
          }

        </div>}
      </Fragment>
    )
  }
}

Index.propTypes = {
  limit: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.object
};

export default connect(state => {
  return {
    limit: state.userList.limit,
    isLoading: state.userList.inProgress,
    currentUser: state.auth.currentUser,
    users: state.userList.users,
    errors: state.userList.errors
  }
}, {fetchUsers, setFetchingLimit})(Index);
