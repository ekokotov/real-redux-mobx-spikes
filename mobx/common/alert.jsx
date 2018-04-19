import React, {PureComponent} from 'react';
import Props from 'prop-types';

class Alert extends PureComponent {
  render() {
    return (
      <div className={`alert alert-${this.props.type}`} role="alert">
        {this.props.message}
      </div>
    )
  }
}

Alert.propTypes = {
  message: Props.string.isRequired,
  type: Props.oneOf(['primary', 'success', 'danger', 'warning'])
};

Alert.defaultProps = {
  type: 'success'
};

export default Alert;