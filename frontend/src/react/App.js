import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import { List, NavBar, Button } from './components/component.lib';

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
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render = () => {
    return(
      <BrowserRouter>
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
          <List
            listType='ul'
          >
            {'I am the walrus'}
          </List>
          <Button
            className='btn btn-primary'
            onClickFn={()=>console.log('hi')}
            innerText='Yeet'
          />
        </section>
      </BrowserRouter>
    )
  }
}