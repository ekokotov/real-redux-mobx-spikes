import React, {PureComponent} from 'react';

class Login extends PureComponent {
  render() {
    return (
      <div className="container">
        <form className="form-login">
          <h2 className="form-login-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required=""
                 autoFocus=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
          <div className="checkbox">
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default Login;