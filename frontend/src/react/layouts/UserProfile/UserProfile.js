import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { List, Heading, Img, Card, Paragraph } from '../../components/component.lib';

import './UserProfile.css';

import { USER_PROFILE } from '../../../stateFn/stateCommon';

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

  renderFromProps = () => {
    if (this.props.userProfile == null) return null;
    const { loggedInAs } = this.props;
    const { shows, user } = this.props.userProfile;
    const showsList = (shows) ? shows.map((show) => {
      const { genre_name, id, img_url, title} = show;
      return (
        <Card
          className='card card--show'
        >
          <div className='ctr-show__img'>
            <Img className='show__img'  src={img_url} alt={`Show image for ${id}`}/>
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
        </Card>
      )
    }) : (
      <Paragraph
        className='lead'
      >
        User has no shows
      </Paragraph>
    );
    const { id, username } = user;
    const primHeading = (
      <Heading
          headingType={1}
          innerText={`User: ${username}`}
      />
    );
    const postShow = (loggedInAs !== null && loggedInAs.username === username) ? (
      <Link to={`/user/post/${id}`} className='btn btn-primary'>Post New Show</Link>
    ) : null;
    return [primHeading, showsList, postShow];
  }

  render = () => {
    const eleToRender = this.renderFromProps();
    return(
      <section
        className='user-profile mx-auto'
      >
        <div className='ctr-header'>
          <Img className='profile__img' src='https://upload.wikimedia.org/wikipedia/commons/b/b8/Placeholder-image.png' alt='placeholder' />
          {this.props.userProfile != null ? eleToRender[0] : null}
        </div>
        <div className='ctr-list'>
          <hr></hr>
          <Heading
              headingType={3}
              className='h3 mt-5 mb-2'
              innerText='Now Watching'
            />
          <List
            className='list--shows'
            listItemClass='list__item'
            listType='ul'
          >
            {this.props.userProfile != null ? eleToRender[1] : null}
          </List>
        </div>
        <div className='ctr-post'>
          {this.props.userProfile != null ? eleToRender[2] : null}
        </div>
      </section>
    )
  }
}

UserProfile.propTypes = {
  disposeProfileFn: PropTypes.func.isRequired,
  fetchSingleUsersProfileFn: PropTypes.func.isRequired,
  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
      id: PropTypes.number
    }),
    shows: PropTypes.arrayOf(
      PropTypes.shape({
        genre_id: PropTypes.number,
        id: PropTypes.number,
        img_url: PropTypes.string,
        title: PropTypes.string
      })
    )
  })
}

export { UserProfile }