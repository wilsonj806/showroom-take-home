import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = (props) => {
  const { className, children, style } = props
  return (
    <p
      className={className}
      style={style}
    >
      {children}
    </p>
  )
}

Paragraph.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string]).isRequired
};

export { Paragraph }