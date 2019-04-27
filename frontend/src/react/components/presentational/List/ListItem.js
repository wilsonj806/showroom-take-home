import React from 'react';
import PropTypes from 'prop-types';

import './list.css';

const ListItem = (props) => {
  const { className, children } = props
  return (
    <li
      className={className}
    >
      {children}
    </li>
  )
}

ListItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { ListItem }