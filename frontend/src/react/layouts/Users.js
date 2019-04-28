import React, { Component } from 'react';
import { List, Heading, Img, Button } from '../components/component.lib';


class Users extends Component {
  componentDidMount = () => {

  }

  render = () => {
    return(
      <section
        className=''
      >
        <Button
          className='btn btn-primary'
          onClickFn={sayHi}
          innerText='Say Hi'
        />
      </section>
    )
  }
}

const sayHi = () => console.log('hi');

export { Users }