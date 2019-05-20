import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import Alert from '../../components/alert';
import FormInput from '../../components/formInput';
import {connect} from "../../store";
import {login} from "../../store/auth/actions";

class Login extends Component {
    formInputs = {
        email: React.createRef(),
        password: React.createRef(),
    };

    state = {
        errors: null
    };

    submit = e => {
        e.preventDefault();
        this.props.login({email: this.formInputs.email.current.value, password: this.formInputs.password.current.value})
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
                    <FormInput label="Email" type="email" ref={this.formInputs.email}
                               error={errors && errors.email} required={true}/>
                    <FormInput label="Password" type="password" ref={this.formInputs.password}
                               error={errors && errors.password} required={true}/>
                    <button className="btn btn-lg btn-primary btn-block"><i className="fas fa-sign-in-alt"/> Log in
                    </button>
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

export default connect(state => ({
    loading: state.auth.inProgress
}), {login})(withRouter(Login));
