import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button } from './components/component.lib';
import { Landing } from './layouts/Landing';
import { Users } from './layouts/Users';

import { fetchUsersList } from '../stateFn/stateUsers';

const initialState = {
  users: [],
  shows: [],
  genres: [],
  comments: [],
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
    return inputFn.bind(this)
  };

  render = () => {
    const newFn = this.bindFn(fetchUsersList);
    // Use Context API to pass fetch functions into children?
    // we can also pass in props into the Route components
    // pass dispatch functions into children to make calls to update state?
    return(
      <>
        <NavBar
          id='nav'
          navClass='nav'
          listItemClass='nav__item'
          listClass='nav__list'
        >
          <NavLink
            key={1}
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            key={2}
            to='/users'
          >
            Users
          </NavLink>
          <NavLink
            key={3}
            to='/shows'
          >
            Shows
          </NavLink>
        </NavBar>
        <section>
          <Route exact path="/" render={(props) => (
            <Landing
              {...props}
              fetchUsersFn={newFn}
            />
          )} />
          <Route path="/users" component={Users} />
        </section>
      </>
    )
  }
}