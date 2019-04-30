import React from 'react';
import PropTypes from 'prop-types';

const Img = (props) => {
  const { className, src, alt, style } = props
  return (
    <img
      style={style}
      className={`${className}`}
      src={src}
      alt={alt}
    />
  )
}

Image.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { Img }