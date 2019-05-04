import React, {Component} from 'react';
import {inject} from "mobx-react";
import {withRouter} from 'react-router-dom';

@inject('authStore')
@withRouter
class Nav extends Component {
  logout = () => {
    this.props.authStore.logout();
    this.props.history.push('/login');
  };

  render() {
    let {user} = this.props.authStore;
    return (
      <nav className="navbar navbar-dark bg-primary">
        {user && <span className="navbar-brand"><i
          className={`fas fa-${user.gender}`}/> &nbsp; {user.username}</span>}
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

export default Nav;
