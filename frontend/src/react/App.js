import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button, Message } from './components/component.lib';
import { Landing } from './layouts/Landing';
import { Users } from './layouts/Users';
import { UserProfile } from './layouts/UserProfile';
import { Shows } from './layouts/Shows';
import { Login } from './layouts/Login';
import { Register } from './layouts/Register';
import { PostShow } from './layouts/PostShow';

import { fetchUsersList, queryLogin, queryRegister, logoutOfProfile } from '../stateFn/stateUsers';
import { fetchShowsList } from '../stateFn/stateShows';
import { fetchSingleUsersProfile, disposeProfile } from '../stateFn/stateSingleUser';
import { getGenres, queryShows } from '../stateFn/statePostShow';

import { IDLE, HOME, updateLocation, resetMsg } from '../stateFn/stateCommon';

// TODO find a way to preserve state when the user accesses something they're not supposed to
  // right now it just resets

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
  msg: null
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidUpdate = (prevProps, prevState) => {

  }

  bindFn = (inputFn) => {
    if(typeof inputFn !== 'function') throw new Error('error inputFn isn\'t a function');
    return inputFn.bind(this);
  };

  render = () => {
    const { isLoggedIn, loggedInAs } = this.state
    return(
      <div onClick={()=> resetMsg.bind(this)()}>
        <NavBar
          id='nav'
          navClass='nav navbar-dark bg-primary'
          listItemClass='nav__item'
          listClass='nav__list'
          loggedInAs={isLoggedIn === true ? loggedInAs : null}
          logoutFn={logoutOfProfile.bind(this)}
        />
        <div className='route-ctr'>
          <Message
            msg={this.state.msg}
            resetMsgFn={resetMsg.bind(this)}
          />
          <Route exact path="/" render={(props) => (
            <Landing
              {...props}
              updateLocation={updateLocation.bind(this)}
              loggedInAs={isLoggedIn === true ? loggedInAs : null}
            />
          )} />
          <Route path="/users" exact render={(props) => (
            <Users
              {...props}
              updateLocation={this.bindFn(updateLocation)}
              loggedInAs={this.state.loggedInAs}
              usersList={this.state.users}
              fetchUsersFn={fetchUsersList.bind(this)}
            />
          )} />
          <Route path="/shows" exact render={(props) => (
            <Shows
              {...props}
              updateLocation={updateLocation.bind(this)}
              showsList={this.state.shows}
              fetchShowsFn={fetchShowsList.bind(this)}
            />
          )} />
          <Route path="/users/login" render={(props) => (
            <Login
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              updateLocation={updateLocation.bind(this)}
              queryLoginFn={queryLogin.bind(this)}
            />
          )} />
          <Route path="/users/register" render={(props) => (
            <Register
              {...props}
              isLoggedIn={this.state.isLoggedIn}
              updateLocation={updateLocation.bind(this)}
              queryRegisterFn={queryRegister.bind(this)}
            />
          )} />
          <Route path="/user/:id" exact={true} render={(props) => (
            <UserProfile
              {...props}
              loggedInAs={isLoggedIn === true ? loggedInAs : null}
              disposeProfileFn={disposeProfile.bind(this)}
              updateLocation={updateLocation.bind(this)}
              fetchSingleUsersProfileFn={fetchSingleUsersProfile.bind(this)}
              userProfile={this.state.userProfileToShow}
            />
          )} />
          <Route path="/user/post/:id" exact={true} render={(props) => (
            <PostShow
              {...props}
              genres={this.state.genres}
              getGenresFn={getGenres.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
              loggedInAs={isLoggedIn === true ? loggedInAs : null}
              updateLocation={updateLocation.bind(this)}
              queryShowsFn={queryShows.bind(this)}
            />
          )} />
        </div>
      </div>
    )
  }
}