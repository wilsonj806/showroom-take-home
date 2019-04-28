import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button } from './components/component.lib';
import { Landing } from './layouts/Landing';
import { Users } from './layouts/Users';
import { Shows } from './layouts/Shows';
import { Login } from './layouts/Login';

import { fetchUsersList, queryLogin } from '../stateFn/stateUsers';
import { fetchShowsList } from '../stateFn/stateShows';

const initialState = {
  users: [],
  shows: [],
  genres: [],
  comments: [],
  isLoggedIn: false,
  loggedInAs: null,
  isMakingRequest: false,
  isUpToDate: true,
  tablesNotUpToDate: null,
  currentPage: 'HOME',
  serverMessage: null,
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  bindFn = (inputFn) => {
    if(typeof inputFn !== 'function') throw new Error('error inputFn isn\'t a function');
    return inputFn.bind(this);
  };

  render = () => {
    const { isLoggedIn, loggedInAs } = this.state
    return(
      <>
        <NavBar
          id='nav'
          navClass='nav navbar-dark bg-primary'
          listItemClass='nav__item'
          listClass='nav__list'
          loggedInAs={isLoggedIn === true ? loggedInAs : null}
        />
        <div className='route-ctr'>
          <Route exact path="/" render={(props) => (
            <Landing
              {...props}
              loggedInAs={isLoggedIn === true ? loggedInAs : null}
            />
          )} />
          <Route path="/users" exact render={(props) => (
            <Users
              {...props}
              usersList={this.state.users}
              fetchUsersFn={this.bindFn(fetchUsersList)}
            />
          )} />
          <Route path="/shows" exact render={(props) => (
            <Shows
              {...props}
              showsList={this.state.shows}
              fetchShowsFn={this.bindFn(fetchShowsList)}
            />
          )} />
          <Route path="/users/login" component={(props) => (
            <Login
              {...props}
              queryLoginFn={this.bindFn(queryLogin)}
            />
          )} />
        </div>
      </>
    )
  }
}