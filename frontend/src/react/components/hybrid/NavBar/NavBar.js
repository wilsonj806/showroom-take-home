import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './navbar.css';
import { List, Heading, Button } from '../../component.lib';

const sayHi = () => console.log('hi');

const NavBar = (props) => {
  const { id, listClass, listItemClass, navClass, isLoggedIn } = props;
  const logIn = isLoggedIn ? 'doo doo babby shark' : (
    <NavLink
      key={3}
      to='/users/login'
      className='btn btn-outline-warning'
    >
      Login
    </NavLink>

  )
  return(
    <nav
      id={id}
      className={navClass}
    >
      <div
        className='nav-left'
      >
        <Heading
          headingType={2}
          className='nav__heading'
          innerText='TV Show Watchlist'
        />
      </div>
      <div
        className='nav-right'
      >
        <List
          className={listClass}
          listType='ul'
          listItemClass={listItemClass}
        >
          <NavLink
            key={1}
            to='/'
            className='nav-link text-light'
          >
            Home
          </NavLink>
          <NavLink
            key={2}
            to='/users'
            className='nav-link text-light'
          >
            Users
          </NavLink>
          <NavLink
            key={3}
            to='/shows'
            className='nav-link text-light'
          >
            Shows
          </NavLink>
        </List>
        {logIn}
      </div>
    </nav>
  )
}

NavBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  navClass: PropTypes.string,
  listClass: PropTypes.string,
  listItemClass: PropTypes.string,
  isLoggedIn: PropTypes.bool
}

export { NavBar }