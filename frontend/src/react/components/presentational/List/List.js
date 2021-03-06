import React from 'react';
import PropTypes from 'prop-types';

import './list.css';
import { ListItem } from './ListItem';

const List = (props) => {
  const { className, children, listType, listItemClass } = props
  const listItems = mapToListItem(children, listItemClass);
  switch(listType) {
    case 'ol':
      return(
        <ol
          className={className || ''}
        >
          {listItems}
        </ol>
      )
    case 'ul':
      return(
        <ul
          className={className || ''}
        >
          {listItems}
        </ul>
      )
    default:
      throw new Error("Error expecting a list type of either 'ul', or 'ol'")
  }
}

const mapToListItem = (children, listItemClass = 'list__item') => {
  if (children instanceof Array) {
    const map = children.map((child, i) => (
      <ListItem className={listItemClass} key={i}>{child}</ListItem>
    ));
    return map;
  } else {
    return <ListItem className={listItemClass}>{children}</ListItem>
  }
}

List.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  listItemClass: PropTypes.string,
  listType: PropTypes.oneOf(['ol', 'ul']),
};

export { List }