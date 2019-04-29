import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, Heading, Img, Button, Card, Paragraph } from '../components/component.lib';
import { USERS } from '../../stateFn/stateCommon';

class Users extends Component {
  componentDidMount = () => {
    if(this.props.usersList.length === 0) {
      this.props.fetchUsersFn();
    }
    this.props.updateLocation(USERS);
  }

  mapUsersList = () => {
    const { usersList } = this.props;
    return usersList.map((user, i ) => {
      const { id, username} = user;
      return (
        <Card
          className='card'
          style={cardStyle}
        >
          <Link key={i} to={`/user/${id}`}>
            <Paragraph
              style={{margin:'0px', padding: '0.75rem'}}
            >
              {username}
            </Paragraph>
          </Link>
        </Card>
      )
    });
  }

  render = () => {
    const { loggedInAs } = this.props;
    const isLoggedIn =  loggedInAs ? (
      <Paragraph
        style={{margin:'0px', padding: '0.75rem'}}
      >
        Logged in as:
        <Link to={`/user/${loggedInAs.id}`}>
          {` ${loggedInAs.username}`}
        </Link>
      </Paragraph>
    ) : null;
    return(
      <section
        className='single-column'
      >
        <div
          className='users-wrapper'
          style={{width: '33%'}}
        >
          <Heading
            headingType={1}
            innerText='Users List'
          />
          {isLoggedIn}
          <List
            className='list--users'
            listItemClass='list__item--sm'
            listType='ul'
          >
            {this.mapUsersList()}
          </List>
        </div>
      </section>
    )
  }
}

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const loginStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

Users.propTypes = {
  fetchUsersFn: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }))
}

export { Users }