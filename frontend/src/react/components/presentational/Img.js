import React from 'react';
import PropTypes from 'prop-types';

const Img = (props) => {
  const { className, src, alt } = props
  return (
    <img
      className={`${className}`}
      src={src}
      alt={alt}
    />
  )
}

Image.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { Img }