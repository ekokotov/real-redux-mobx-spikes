import React, {Component} from 'react';
import _mapValues from 'lodash/mapValues';
import Alert from '../../components/alert';
import FormInput from '../../components/formInput';
import {inject, observer} from "mobx-react";

@inject('authStore')
@observer
class SignUp extends Component {
  formInputs = {};

  submit = async e => {
    e.preventDefault();
    await this.props.authStore.signUp(this.getFormInputs());
    this.props.history.push("/");
  };

  getFormInputs = () => _mapValues(this.formInputs, input => input.value);

  render() {
    let {errors} = this.props.authStore;

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

export default SignUp;
