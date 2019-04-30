import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const { className, innerText, children,  headingType } = props
  switch(headingType) {
    case 1:
      return (
        <h1 className={className}>{innerText || children }</h1>
      )
    case 2:
      return (
        <h2 className={className}>{innerText || children}</h2>
      )
    case 3:
      return (
        <h3 className={className}>{innerText || children}</h3>
      )
    case 4:
      return (
        <h4 className={className}>{innerText || children}</h4>
      )
    case 5:
      return (
        <h5 className={className}>{innerText || children}</h5>
      )
    case 6:
      return (
        <h6 className={className}>{innerText || children}</h6>
      )
    default:
      throw new Error('Error, expecting a headingType value from 1-6')
  }
}

Heading.propTypes = {
  className: PropTypes.string,
  headingType: PropTypes.oneOf([1,2,3,4,5,6]),
  innerText: PropTypes.string
};

export { Heading }