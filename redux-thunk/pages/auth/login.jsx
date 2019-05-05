import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {login} from '../../store/auth/actions';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import Alert from '../../components/alert';
import FormInput from '../../components/formInput';

class Login extends PureComponent {
  formInputs = {};

  state = {
    errors: null
  };

  submit = e => {
    e.preventDefault();
    this.props.login({email: this.formInputs.email.value, password: this.formInputs.password.value})
      .then(() => this.props.history.push('/'))
      .catch(errors => this.setState({errors}))
  };

  render() {
    let {errors} = this.state;
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
  loading: PropTypes.bool
};

export default connect(state => {
  return {
    loading: state.auth.inProgress
  }
}, {login})(withRouter(Login));
