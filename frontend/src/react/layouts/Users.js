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
  // TODO for convenience get this to return the number of shows also
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
              style={{margin:'0px', padding: '0.75rem', fontSize:'1.25rem'}}
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
      <Heading
        headingType={3}
        className='h3'
        style={{margin:'0px', padding: '0.75rem'}}
      >
        Logged in as:
        <Link to={`/user/${loggedInAs.id}`}>
          {` ${loggedInAs.username}`}
        </Link>
      </Heading>
    ) : null;
    return(
      <section
        className='single-column'
      >
        <div
          className='users-wrapper mx-auto mt-5'
          style={{width: '33%', height: '60vh'}}
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