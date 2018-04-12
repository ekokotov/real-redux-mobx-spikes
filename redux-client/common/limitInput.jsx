import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class LimitInput extends PureComponent {
  constructor() {
    super();
    this.select = this.select.bind(this);
  }

  select(e) {
    this.props.select(parseInt(e.target.innerText, 10));
  }

  render() {
    return (
      <nav className="float-md-right">
        load records:
        <ul className="pagination pagination-sm">
          {this.props.values.map( value => <li key={value} onClick={this.select} className="page-item"><span className="page-link">{value}</span></li>)}
        </ul>
      </nav>
    )
  }
}

LimitInput.propTypes = {
  values: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
};

export default LimitInput