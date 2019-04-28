import React, { Component } from 'react';
import { List, Heading, Img, Paragraph, Button, Card } from '../components/component.lib';

import './layouts.css';
// TODO: maybe add a user and show count

class Landing extends Component {
  componentDidMount = () => {

  }

  render = () => {
    const text = 'Welcome to the TV Show WatchList App!';
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
            {`
              ${text}
            `}
          </Paragraph>
        </Card>
      </section>
    )
  }
}

const style = {
  width: '33vw',
  height: '20rem'
}

export { Landing }