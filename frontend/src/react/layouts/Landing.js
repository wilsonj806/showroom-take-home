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
        className='landing'
      >
        <Card
          className='card'
          style={style}
        >
          <Heading
            className=''
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
          <Button
            className='btn btn-primary'
            onClickFn={()=>console.log('hi')}
            innerText='Fetch stuff'
          />
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