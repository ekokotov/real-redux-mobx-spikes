import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {login} from '../actions/auth';
import PropTypes  from 'prop-types';

class Login extends PureComponent {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.login({email: this.email.value, password: this.password.value})
      .then(data => {
        console.log('REDIRECT');
    })
  }

  render() {
    return (
      <div className="container">
        <form className="form-login" onSubmit={this.submit}>
          <h2 className="form-login-heading">Please sign in</h2>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input ref={input => this.email = input} type="email" id="inputEmail" className="form-control"
                 placeholder="Email address" required=""
                 autoFocus="" defaultValue="ekokotov@gmail.com"/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input ref={input => this.password = input} type="password" id="inputPassword" className="form-control"
                 placeholder="Password" required="" defaultValue="119911"/>
          <div className="checkbox">
          </div>
          <button className="btn btn-lg btn-primary btn-block">Sign in</button>
        </form>
      </div>
    )
  }
}

Login.propTypes  = {
  login: PropTypes.func.isRequired
};

export default connect(null, {login})(Login);
