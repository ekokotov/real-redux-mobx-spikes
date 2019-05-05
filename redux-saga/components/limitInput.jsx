import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

class LimitInput extends PureComponent {
    select = e => this.props.select(parseInt(e.target.innerText, 10));

    render() {
        return (
            <nav className="float-md-right">
                load records:
                <ul className="pagination pagination-sm">
                    {this.props.values.map(value =>
                        <li key={value} onClick={this.select}
                            className={classNames("page-item", {active: value === this.props.limit})}>
                            <span className="page-link">{value}</span>
                        </li>
                    )}
                </ul>
            </nav>
        )
    }
}

LimitInput.propTypes = {
    limit: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired
};

LimitInput.defaultValue = {
    limit: 0
};

export default LimitInput
