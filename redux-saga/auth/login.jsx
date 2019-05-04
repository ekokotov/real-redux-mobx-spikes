import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {login} from './authActions';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import Alert from '../common/alert';
import FormInput from '../common/formInput';

class Login extends PureComponent {
  formInputs = {};
  state = {
    errors: null
  };

  submit = () => this.props.login({email: this.formInputs.email.value, password: this.formInputs.password.value});

  render() {
    let {errors} = this.props;

    return (
      <div className="d-flex h-100">
        <form className="container col-lg-4 justify-content-center align-self-center" onSubmit={this.submit}>
          <h2>Please sign in</h2>
          {errors && errors.error && <Alert message={errors.error} type="danger"/>}
          <FormInput label="Email" type="email" link={input => this.formInputs.email = input}
                     error={errors && errors.email} required={true}/>
          <FormInput label="Password" type="password" link={input => this.formInputs.password = input}
                     error={errors && errors.password} required={true}/>
          <button className="btn btn-lg btn-primary btn-block"><i className="fas fa-sign-in-alt"/> Log in</button>
          <Link to="/signup">No Account? Register Now!</Link>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object
};

export default connect(state => {
  return {
    loading: state.auth.inProgress,
    errors: state.auth.errors
  }
}, {login})(withRouter(Login));
