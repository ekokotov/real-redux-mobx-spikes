import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Alert from './alert';

class FormInput extends PureComponent {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.label}>{this.props.label}</label>
        <input type={this.props.type} id={this.props.label} ref={this.props.link} className="form-control"
               placeholder={this.props.label} required={this.props.required}/>
        {this.props.error && <Alert message={this.props.error} type="danger"/>}
      </div>
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
