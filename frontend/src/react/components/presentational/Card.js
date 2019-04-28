import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Card extends Component {
  render = () => {
    const { className, children, style } = this.props;
    return (
      <section
        className={className}
        style={style}
      >
        {children}
      </section>
    )
  }
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.object
}

export { Card }