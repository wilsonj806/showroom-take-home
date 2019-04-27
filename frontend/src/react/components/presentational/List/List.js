import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const { className, children, listType } = props
  switch(listType) {
    case 'ol':
      return(
        <ol
          className={className}
        >
          {children}
        </ol>
      )
    case 'ul':
      return(
        <ul
          className={className}
        >
          {children}
        </ul>
      )
    default:
      throw new Error("Error expecting a list type of either 'ul', or 'ol'")
  }
}

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  listType: PropTypes.oneOf(['ol', 'ul']),
};

export { List }