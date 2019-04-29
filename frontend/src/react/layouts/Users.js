import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, Heading, Img, Button, ListItem } from '../components/component.lib';


class Users extends Component {
  componentDidMount = () => {
    if(this.props.usersList.length === 0) {
      this.props.fetchUsersFn();
    }
  }

  mapUsersList = () => {
    const { usersList } = this.props;
    return usersList.map((user) => {
      const { id, username} = user;
      return (
        <Link to={`/user/search/${id}`}>{username}</Link>
      )
    });
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