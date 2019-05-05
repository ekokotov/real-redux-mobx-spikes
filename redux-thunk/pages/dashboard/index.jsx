import React, {PureComponent, Fragment} from "react";
import UserList from "./userList";
import Nav from '../../components/navigation';
import {Route} from 'react-router-dom';

class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <Nav/>
        <div className="container">
          <Route path="/" component={UserList}/>
        </div>
      </Fragment>
    )
  }
}

export default Index;
