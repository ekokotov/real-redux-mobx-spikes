import React, {Fragment} from "react";
import UserList from "./userList";
import Nav from '../../components/navigation';
import {Route} from 'react-router-dom';

export default function DashBoard() {
    return (
      <Fragment>
        <Nav/>
        <div className="container">
          <Route path="/" component={UserList}/>
        </div>
      </Fragment>
    )
};
