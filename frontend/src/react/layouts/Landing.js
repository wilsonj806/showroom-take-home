import React, { Component } from 'react';
import { Heading, Paragraph, Card } from '../components/component.lib';

import PropTypes from 'prop-types';

import './layouts.css';

import { HOME } from '../../stateFn/stateCommon';
// TODO: maybe add a user and show count

class Landing extends Component {
  componentDidMount = () => {
    this.props.updateLocation(HOME);
  }

  render = () => {
    const text = 'Welcome to the TV Show WatchList App!';
    const { loggedInAs } = this.props;
    const loginWelcome = loggedInAs ? `Logged in as ${loggedInAs.username}` : `Currently not logged in`;
    return(
      <section
        className='single-card'
      >
        <Card
          className='card'
          style={style}
        >
          <Heading
            className='text-center h1'
            headingType={1}
            innerText='Welcome!'
          />
          <Paragraph
            className="lead"
          >
            {text}
          </Paragraph>
          <Paragraph
            className="lead"
          >
            {loginWelcome}
          </Paragraph>
        </Card>
      </section>
    )
  }
}

const style = {
  width: '33vw',
  height: '20rem',
  padding: '1rem'
}

Landing.propTypes = {
  loggedInAs: PropTypes.object
}

export { Landing }