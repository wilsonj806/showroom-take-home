import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { className, onClickFn, innerText } = props
  return (
    <button
      className={className}
      innerText={innerText}
      onClick={onClickFn}
    />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  innerText: PropTypes.string.isRequired,
  onClickFn: PropTypes.func.isRequired,
};

export { Button }