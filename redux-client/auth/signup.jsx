import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom'
import {signup} from "./authActions";
import _mapValues from 'lodash/mapValues';
import Alert from '../common/alert';
import FormInput from '../common/formInput';

class SignUp extends PureComponent {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.formInputs = {}
  }

  state = {
    errors: null
  };

  submit(e) {
    e.preventDefault();
    this.props.signup(this.getFormInputs())
      .then(data => this.props.history.push('/'))
      .catch(errors => this.setState({errors}))
  }

  getFormInputs() {
    return _mapValues(this.formInputs, input => input.value);
  }

  render() {
    let {errors} = this.state;
    return (
      <form className="container form-signin" onSubmit={this.submit}>
        <h2 className="form-signin-heading">Please sign in</h2>
        {errors && errors.error && <Alert message={errors.error} type="danger"/>}

        <FormInput label="Email" type="email" link={input => this.formInputs.email = input}
                   error={errors && errors.email} required={true}/>
        <FormInput label="Password" type="password" link={input => this.formInputs.password = input}
                   error={errors && errors.password} required={true}/>
        <FormInput label="Username" link={input => this.formInputs.username = input} error={errors && errors.username}
                   required={true}/>

        <label htmlFor="inputGender">Gender</label>
        <select name="gender" id="inputGender" ref={input => this.formInputs.gender = input} className="form-control">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button className="btn btn-lg btn-primary btn-block"><i className="fas fa-sign-in-alt"/> Sign in</button>
      </form>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default connect(state => {
  return {
    loading: state.auth.inProgress
  }
}, {signup})(withRouter(SignUp));
