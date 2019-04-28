import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Heading, Img, Button, ListItem } from '../components/component.lib';


class Users extends Component {
  componentDidMount = () => {
    this.props.fetchUsersFn();
  }

  mapUsersList = () => {
    const { usersList } = this.props;
    return usersList.map((user) => user.username);
  }

  render = () => {
    return(
      <section
        className=''
      >
        <Heading
          headingType={1}
          innerText='Users List'
        />
        <List
          className=''
          listItemClass='list__item'
          listType='ul'
        >
          {this.mapUsersList()}
        </List>
      </section>
    )
  }
}

Users.propTypes = {
  fetchUsersFn: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }))
}

export { Users }