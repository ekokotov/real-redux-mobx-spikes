import React from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';
import Alert from '../../components/alert';
import FormInput from '../../components/formInput';
import {Store} from "../../store";
import {login} from "../../store/auth/actions";

function Login(props) {
    const {dispatch} = React.useContext(Store);
    const [errors, setErrors] = React.useState({});
    const email = React.createRef();
    const password = React.createRef();

    const submit = async event => {
        event.preventDefault();
        try {
            await dispatch(login({email: email.current.value, password: password.current.value}));
            props.history.push('/');
        } catch (e) {
            setErrors(e);
        }
    };

    return <div className="d-flex h-100">
        <form className="container col-lg-4 justify-content-center align-self-center" onSubmit={submit}>
            <h2>Please sign in</h2>
            {errors.error && <Alert message={errors.error} type="danger"/>}
            <FormInput label="Email" type="email" ref={email} error={errors.email} required={true}/>
            <FormInput label="Password" type="password" ref={password} error={errors.password} required={true}/>
            <button className="btn btn-lg btn-primary btn-block"><i className="fas fa-sign-in-alt"/> Log in</button>
            <Link to="/signup">No Account? Register Now!</Link>
        </form>
    </div>;
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Login);
