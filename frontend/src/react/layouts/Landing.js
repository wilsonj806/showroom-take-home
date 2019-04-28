import React, { Component } from 'react';
import { List, Heading, Img, Paragraph, Button } from '../components/component.lib';


class Landing extends Component {
  componentDidMount = () => {

  }

  render = () => {
    const { fetchUsersFn } = this.props;
    return(
      <section
        className=''
      >
        <Heading
          className=''
          headingType={1}
          innerText='Hello there!'
        />
        <Button
          className='btn btn-primary'
          onClickFn={fetchUsersFn}
          innerText='Fetch stuff'
        />
      </section>
    )
  }
}

export { Landing }