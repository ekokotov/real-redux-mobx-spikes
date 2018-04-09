import React, {PureComponent} from 'react';
//import {Link} from 'react-router-dom';

class Nav extends PureComponent {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Logout<span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;