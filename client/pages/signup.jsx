import React, {PureComponent} from 'react';

class SignUp extends PureComponent {
  render() {
    return (
      <div className="container">
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" className="form-control" placeholder="Email address" required=""
                 autoFocus=""/>

          <label htmlFor="password">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Password" required=""/>

          <label htmlFor="username">Username</label>
          <input type="text" id="username" className="form-control" placeholder="username" required=""/>

          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender" className="form-control">
            <option value="male">male</option>
            <option value="female">Female</option>
          </select>

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}

export default SignUp;