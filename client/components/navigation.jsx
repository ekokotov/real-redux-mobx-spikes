import React, {PureComponent} from 'react';
import {logout} from '../actions/auth';
import {connect} from 'react-redux';

class Nav extends PureComponent {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    let {user} = this.props;
    return (
      <nav className="navbar navbar-dark bg-primary">
        {user && <span className="navbar-brand"><i
          className={`fas fa-${user.gender}`}/> &nbsp; {this.props.user.username}</span>}
        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item active">
            <button className="btn btn-warning my-2 my-sm-0" onClick={this.logout}><i
              className="fas fa-sign-out-alt"/> &nbsp; Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default connect(state => {
  return {user: state.auth.currentUser}
}, {logout})(Nav);