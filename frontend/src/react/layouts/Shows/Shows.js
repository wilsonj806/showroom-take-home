import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { List, Heading, Img, Card } from '../../components/component.lib';
import { SHOWS } from '../../../stateFn/stateCommon';

import './Shows.css';

class Shows extends Component {
  componentDidMount = () => {
    if (this.props.showsList.length === 0) {
      this.props.fetchShowsFn();
    }
    this.props.updateLocation(SHOWS);
  }

  mapShowsList = () => {
    const { showsList } = this.props;
    const primMap = showsList.map((show, i ) => {
      const { genre_name, title, img_url, users_watching: usersWatch } = show;
      const userMap = usersWatch.map((user, i) => {
        return (<Link key={i} to={`user/${user.id}`}>{user.username}</Link>);
      });
      return (
        <Card
          key={i}
          className='card card--show-user'
        >
        <div className='ctr-show__img'>
          <Img className='show__img'  src={img_url} alt={`Show image for ${title}`}/>
        </div>
        <Heading
          headingType={5}
          className='h5 heading--show-card'
          innerText={title}
        />
        <Heading
          headingType={5}
          className='h5 show__genre'
          innerText={`${genre_name}`}
        />
        <div className='ctr-show-users'>
          <Heading
            headingType={6}
            className='h6'
            innerText='Users Watching: '
          />
          <List
            listType='ul'
          >
            {userMap}
          </List>
        </div>
      </Card>
      )
    });
    return primMap;
  }

  render = () => {
    return(
      <section
        className='single-column'
      >
        <div className='shows-wrapper mx-auto mt-5'>
        <Heading
          headingType={1}
          innerText='Shows List'
        />
        <List
          className='list--shows'
          listItemClass='list__item'
          listType='ul'
        >
          {this.mapShowsList()}
        </List>
        </div>
      </section>
    )
  }
}

Shows.propTypes = {
  fetchShowsFn: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }))
}

export { Shows }