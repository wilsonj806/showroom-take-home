import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (props) => {
  const { className, children } = props
  return (
    <p
      className={className}
    >
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string]).isRequired
};

export { Paragraph }