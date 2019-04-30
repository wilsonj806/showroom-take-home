import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { List, Heading, Img } from '../components/component.lib';
import { SHOWS } from '../../stateFn/stateCommon';


class Shows extends Component {
  componentDidMount = () => {
    if (this.props.showsList.length === 0) {
      this.props.fetchShowsFn();
    }
    this.props.updateLocation(SHOWS);
  }

  mapShowsList = () => {
    const { showsList } = this.props;
    return showsList.map((show) => `${show.title} and ${show.genre_id}`);
  }

  render = () => {
    return(
      <section
        className=''
      >
        <Heading
          headingType={1}
          innerText='Shows List'
        />
        <List
          className=''
          listItemClass='list__item'
          listType='ul'
        >
          {this.mapShowsList()}
        </List>
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