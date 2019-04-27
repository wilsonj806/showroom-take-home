import React from 'react';
import PropTypes from 'prop-types';

const NavBar = (props) => {
  const { id, children, className } = props;
  return(
    <nav
      id={id}
      className={className}
    >
      {children}
    </nav>
  )
}

NavBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired
}