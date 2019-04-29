import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Heading, Img, Card, Paragraph, Button } from '../components/component.lib';

import { USER_PROFILE } from '../../stateFn/stateCommon';

const localState = {
  username: null,
  fetchFinished: true,
}
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = localState;
  }
  componentWillMount = () => {
    if (this.props.userProfile == null) {
      const url = this.props.location.pathname;
      const split = this.splitUrl(url);
      this.props.fetchSingleUsersProfileFn(split);
    }
  }

  componentWillUnmount = () => {
    this.props.disposeProfileFn(USER_PROFILE);
  }

  splitUrl = (urlLocation) => {
    return parseInt(urlLocation.split(/\//)[2]);
  }
  mapShowsList = () => {
    if (this.props.userProfile == null) return null;
    const { shows } = this.props.userProfile;
    return shows.map((show) => {
      const { genre_id, id, img_url, title} = show;
      return (
        <Card
          className='card'
        >
          <Heading
            headingType={3}
            className='h3'
            innerText={title}
          />
          <Heading
            headingType={4}
            className='subtitle'
            innerText={genre_id}
          />
          <Img style={thumbnailStyle} src={img_url} alt={`Show image for ${id}`}/>
        </Card>
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
          innerText={`User: ${1}`}
        />
        <List
          className='list--shows'
          listItemClass='list__item'
          listType='ul'
        >
          {this.mapShowsList()}
        </List>
      </section>
    )
  }
}

const thumbnailStyle = {
  maxWidth: '10rem',
  height: 'auto'
}

UserProfile.propTypes = {
  disposeProfileFn: PropTypes.func.isRequired,
  fetchSingleUsersProfileFn: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.number
    }),
    shows: PropTypes.arrayOf([
      PropTypes.shape({
        genre_id: PropTypes.number,
        id: PropTypes.number,
        title: PropTypes.string,
        img_url: PropTypes.string,
      })
    ])
  })
}

export { UserProfile }