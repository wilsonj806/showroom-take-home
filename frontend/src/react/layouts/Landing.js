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
    const text = 'Welcome to the TV Show WatchList App! This app lets you add shows and see what other shows users have been watching.';
    const { loggedInAs } = this.props;
    const loginWelcome = loggedInAs ? `Logged in as ${loggedInAs.username}` : `Currently not logged in`;
    return(
      <section
        className='single-card'
      >
        <Card
          className='card card--simple'
        >
          <Heading
            className='text-center h1'
            headingType={1}
            innerText='Welcome!'
          />
          <Paragraph
            className="lead"
            style={{width: '80%'}}
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

Landing.propTypes = {
  loggedInAs: PropTypes.object
}

export { Landing }