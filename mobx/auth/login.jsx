import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Alert from '../common/alert';
import FormInput from '../common/formInput';
import {inject, observer} from 'mobx-react';
import _mapValues from "lodash/mapValues";

@inject('authStore')
@observer
class Login extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.formInputs = {};
  }

  submit(e) {
    e.preventDefault();
    this.props.authStore.login(this.getFormInputs())
      .then(() => {
        this.props.history.push("/");
      });
  }

  getFormInputs = () => _mapValues(this.formInputs, input => input.value);

  render() {
    let {errors} = this.props.authStore;

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

export default Login;
