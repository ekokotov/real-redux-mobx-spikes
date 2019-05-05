import React from 'react';
import {logout} from '../store/auth/actions';
import {Store} from "../store";

function Nav() {
    const {state, dispatch} = React.useContext(Store);
    const user = state.auth.currentUser;
    const logoutMe = event => {
        event.preventDefault();
        logout(dispatch);
    };

    return (
        <nav className="navbar navbar-dark bg-primary">
            {user && <span className="navbar-brand"><i
                className={`fas fa-${user.gender}`}/> &nbsp; {user.username}</span>}
            <ul className="navbar-nav my-2 my-lg-0">
                <li className="nav-item active">
                    <button className="btn btn-warning my-2 my-sm-0" onClick={logoutMe}><i
                        className="fas fa-sign-out-alt"/> &nbsp; Logout
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
