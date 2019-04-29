import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button } from './components/component.lib';
import { Landing } from './layouts/Landing';
import { Users } from './layouts/Users';
import { UserProfile } from './layouts/UserProfile';
import { Shows } from './layouts/Shows';
import { Login } from './layouts/Login';

import { fetchUsersList, queryLogin } from '../stateFn/stateUsers';
import { fetchShowsList } from '../stateFn/stateShows';
import { fetchSingleUsersProfile, disposeProfile } from '../stateFn/stateSingleUser';

import { IDLE, HOME, updateLocation } from '../stateFn/stateCommon';

const initialState = {
  users: [],
  shows: [],
  genres: [],
  comments: [],
  userProfileToShow: null,
  showProfileToShow: null,
  isLoggedIn: false,
  loggedInAs: null,
  requestStatus: IDLE,
  isUpToDate: true,
  tablesNotUpToDate: null,
  currentPage: HOME,
  serverMessage: null,
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate = () => {

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
              updateLocation={this.bindFn(updateLocation)}
              loggedInAs={isLoggedIn === true ? loggedInAs : null}
            />
          )} />
          <Route path="/users" exact render={(props) => (
            <Users
              {...props}
              updateLocation={this.bindFn(updateLocation)}
              loggedInAs={this.state.loggedInAs}
              usersList={this.state.users}
              fetchUsersFn={this.bindFn(fetchUsersList)}
            />
          )} />
          <Route path="/shows" exact render={(props) => (
            <Shows
              {...props}
              updateLocation={this.bindFn(updateLocation)}
              showsList={this.state.shows}
              fetchShowsFn={this.bindFn(fetchShowsList)}
            />
          )} />
          <Route path="/users/login" render={(props) => (
            <Login
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              updateLocation={this.bindFn(updateLocation)}
              queryLoginFn={this.bindFn(queryLogin)}
            />
          )} />
          <Route path="/user/" render={(props) => (
            <UserProfile
              {...props}
              disposeProfileFn={disposeProfile.bind(this)}
              updateLocation={this.bindFn(updateLocation)}
              fetchSingleUsersProfileFn={this.bindFn(fetchSingleUsersProfile)}
              userProfile={this.state.userProfileToShow}
            />
          )} />
        </div>
      </>
    )
  }
}