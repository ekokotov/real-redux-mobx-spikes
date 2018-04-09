import React, {PureComponent, Fragment} from "react";
import UserList from "../components/userList";
import Nav from '../components/navigation';
import {Route} from 'react-router-dom';

class Dashboard extends PureComponent {
  render() {
    return (
      <Fragment>
        <Nav/>
        <Route path="/" component={UserList}/>
      </Fragment>
    )
  }
}

export default Dashboard;