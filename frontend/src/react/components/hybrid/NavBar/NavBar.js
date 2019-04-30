import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './navbar.css';
import { List, Heading, Paragraph } from '../../component.lib';
import { Button } from '../../presentational/Button';


const NavBar = (props) => {
  const { id, listClass, listItemClass, navClass, loggedInAs, logoutFn } = props;
  const logIn = loggedInAs ? (
    <>
      <Paragraph
        className='login-msg text-light lead' style={{marginRight: '0.75rem'}}
      >
        <b>{`Logged in as ${loggedInAs.username}`}</b>
      </Paragraph>
      <Button
        onClickFn={logoutFn}
        innerText='Logout'
        className='btn btn-secondary'
    />
    </>
    ) : (
    <>
      <NavLink
        key={3}
        to='/users/login'
        className='btn btn-outline-warning'
        style={{marginRight: '0.75rem'}}
      >
        Login
      </NavLink>
      <NavLink
        key={4}
        to='/users/register'
        className='btn btn-success'
      >
        Register
      </NavLink>
    </>

  );
  const postShow = loggedInAs != null ? (
    <NavLink
      key={4}
      to={`/user/post/${loggedInAs.id}`}
      className='nav-link text-light'
    >
      Post New Show
    </NavLink>
  ) : null;
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
          {postShow}
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
  isLoggedIn: PropTypes.bool,
  loggedInAs: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  })
}

export { NavBar }