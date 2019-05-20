import React from 'react';
import _mapValues from "lodash/mapValues";
import {withRouter} from 'react-router-dom'
import {signUp} from "../../store/auth/actions";
import Alert from '../../components/alert';
import FormInput from '../../components/formInput';
import {Store} from "../../store";

const formInputs = {
    email: React.createRef(),
    password: React.createRef(),
    username: React.createRef(),
    gender: React.createRef()
};

function SignUp(props) {
    const {dispatch} = React.useContext(Store);
    const [errors, setErrors] = React.useState({});
    const getFormInputs = () => _mapValues(formInputs, input => input.current.value);
    const submit = async event => {
        event.preventDefault();
        try {
            await dispatch(signUp(getFormInputs()));
            props.history.push('/')
        } catch (e) {
            setErrors(e);
        }
    };

    return <div className="d-flex h-100">
        <form className="container justify-content-center align-self-center col-lg-4" onSubmit={submit}>
            <h2>Please sign in</h2>
            {errors.error && <Alert message={errors.error} type="danger"/>}

            <FormInput label="Email" type="email" ref={formInputs.email} error={errors.email} required={true}/>
            <FormInput label="Password" type="password" ref={formInputs.password} error={errors.password}
                       required={true}/>
            <FormInput label="Username" ref={formInputs.username} error={errors.username} required={true}/>

            <div className="form-group">
                <label htmlFor="inputGender">Gender</label>
                <select name="gender" id="inputGender" ref={formInputs.gender} className="form-control">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <button className="btn btn-lg btn-primary btn-block">
                <i className="fas fa-sign-in-alt"/> Sign up
            </button>
        </form>
    </div>;
}

export default withRouter(SignUp);
