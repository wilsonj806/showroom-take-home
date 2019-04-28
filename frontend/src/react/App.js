import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button } from './components/component.lib';
import { Landing } from './layouts/Landing';
import { Users } from './layouts/Users';
import { Login } from './layouts/Login';

import { fetchUsersList, queryLogin } from '../stateFn/stateUsers';

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
/*
const asyncDispatch = async () => {
  this.setState((prevState) => Object.assign({}, prevState, {isMakingRequest: !prevState.isMakingRequest}));
  try {
    const request = fetch('localhost', 'GET');
    const json = request.clone().json();
    this.setState((prevState) => Object.assign({}, prevState, {isMakingRequest: !prevState.isMakingRequest}));
    return json.users;
  } catch(err) {
    this.setState((prevState) => Object.assign({}, prevState, {
      isMakingRequest: !prevState.isMakingRequest,
      serverMessage: err
    }));
  }
}
*/

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
    // Use Context API to pass fetch functions into children?
    // we can also pass in props into the Route components
    // pass dispatch functions into children to make calls to update state?
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
            />
          )} />
          <Route path="/users" exact render={(props) => (
            <Users
              {...props}
              usersList={this.state.users}
              fetchUsersFn={this.bindFn(fetchUsersList)}
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