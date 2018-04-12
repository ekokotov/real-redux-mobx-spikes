import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import Alert from './alert';

class FormInput extends PureComponent {
  render() {
    return (
      <Fragment>
        <label htmlFor={this.props.label}>Password</label>
        <input type={this.props.type} id={this.props.label} ref={this.props.link} className="form-control"
               placeholder={this.props.label} required={this.props.required}/>
        {this.props.error && <Alert message={this.props.error} type="danger"/>}
      </Fragment>
    )
  }
}

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  link: PropTypes.func
};

FormInput.defaultProps = {
  type: "text"
};


export default FormInput;