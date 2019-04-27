import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { List } from './components/component.lib';


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
        <section>
          <List
            listType='ul'
          >
            {'I am the walrus'}
          </List>
        </section>
      </BrowserRouter>
    )
  }
}