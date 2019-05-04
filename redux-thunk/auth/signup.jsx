import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import {signup} from "./authActions";
import _mapValues from 'lodash/mapValues';
import Alert from '../common/alert';
import FormInput from '../common/formInput';

class SignUp extends PureComponent {
  formInputs = {};
  state = {
    errors: null
  };

  submit = e => {
    e.preventDefault();
    this.props.signup(this.getFormInputs())
      .then(data => this.props.history.push('/'))
      .catch(errors => this.setState({errors}))
  };

  getFormInputs() {
    return _mapValues(this.formInputs, input => input.value);
  }

  render() {
    let {errors} = this.state;
    return (
      <div className="d-flex h-100">
        <form className="container justify-content-center align-self-center col-lg-4" onSubmit={this.submit}>
          <h2>Please sign in</h2>
          {errors && errors.error && <Alert message={errors.error} type="danger"/>}

          <FormInput label="Email" type="email" link={input => this.formInputs.email = input}
                     error={errors && errors.email} required={true}/>
          <FormInput label="Password" type="password" link={input => this.formInputs.password = input}
                     error={errors && errors.password} required={true}/>
          <FormInput label="Username" link={input => this.formInputs.username = input} error={errors && errors.username}
                     required={true}/>

          <div className="form-group">
            <label htmlFor="inputGender">Gender</label>
            <select name="gender" id="inputGender" ref={input => this.formInputs.gender = input}
                    className="form-control">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button className="btn btn-lg btn-primary btn-block"><i className="fas fa-sign-in-alt"/> Sign up</button>
        </form>
      </div>
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
