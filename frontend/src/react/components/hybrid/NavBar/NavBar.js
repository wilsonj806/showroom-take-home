import React from 'react';
import PropTypes from 'prop-types';

import './navbar.css';
import { List, Heading } from '../../component.lib';

const NavBar = (props) => {
  const { id, children, listClass, listItemClass, navClass } = props;
  return(
    <nav
      id={id}
      className={navClass}
    >
      <Heading
        headingType={2}
        className='nav__heading'
        innerText='TV Show Watchlist'
      />
      <List
        className={listClass}
        listType='ul'
        listItemClass={listItemClass}
      >
        {children}
      </List>
    </nav>
  )
}

NavBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  navClass: PropTypes.string,
  listClass: PropTypes.string,
  listItemClass: PropTypes.string,
}

export { NavBar }