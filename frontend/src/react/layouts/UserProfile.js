import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Heading, Img, Card, Paragraph, Button } from '../components/component.lib';

const localState = {
  username: null,
  fetchFinished: true,
}
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = localState;
  }
  componentDidMount = () => {
    const url = this.props.location.pathname;
    const split = this.splitUrl(url);
    this.props.fetchSingleUsersProfileFn(split);
  }

  splitUrl = (urlLocation) => {
    return parseInt(urlLocation.split(/\//)[3]);
  }
  mapShowsList = () => {
    // const { showsList } = this.props;
    // return showsList.map((show) => `${show.title} and ${show.genre_id}`);
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
          className=''
          listItemClass='list__item'
          listType='ul'
          children={['pie','tart']}
        >
        </List>
      </section>
    )
  }
}

UserProfile.propTypes = {
  fetchSingleUsersProfileFn: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number
  }),
  shows: PropTypes.arrayOf([
    PropTypes.shape({
      id: PropTypes.number,
      genre_id: PropTypes.number,
      title: PropTypes.string,
      img_url: PropTypes.string,
    })
  ])
}

export { UserProfile }