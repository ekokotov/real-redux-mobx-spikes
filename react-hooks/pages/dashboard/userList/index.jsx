import React, {Fragment, useEffect} from 'react';
import {fetchUsers, setFetchingLimit} from '../../../store/users/actions';
import LimitInput from "../../../components/limitInput";
import {Store} from "../../../store";

function UserList() {
    const {state, dispatch} = React.useContext(Store);
    const {users, isLoading, limit} = state.userList;
    const selectLimit = newLimit => setFetchingLimit(newLimit, dispatch);

    useEffect(
        ()=> fetchUsers(state.userList.limit, dispatch),
        [limit]
    );

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
                        <LimitInput limit={limit} values={[1, 5, 10, 25, 50]} select={selectLimit}/>
                    </div>
                </div>
            </div>

            {users.length && <div className="list-group">

                {users.map(user =>
                    <a href="#" key={user.email}
                       className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{user.username}</h5>
                            <small style={{fontSize: '25px'}}><i className={`fas fa-${user.gender}`}/></small>
                        </div>
                        {state.auth.currentUser.email === user.email && <span className="badge badge-info">You</span>}
                        &nbsp;
                        <small>{user.email}</small>
                    </a>)
                }

            </div>}
        </Fragment>
    )
}

export default UserList;
