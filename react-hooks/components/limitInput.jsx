import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

export default function LimitInput(props) {
    const select = e => props.select(parseInt(e.target.innerText, 10));

    return <nav className="float-md-right">
        load records:
        <ul className="pagination pagination-sm">
            {props.values.map(value =>
                <li key={value} onClick={select}
                    className={classNames("page-item", {active: value === props.limit})}>
                    <span className="page-link">{value}</span>
                </li>
            )}
        </ul>
    </nav>
}

LimitInput.propTypes = {
    limit: PropTypes.number.isRequired,
    values: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired
};

LimitInput.defaultValue = {
    limit: 0
};
