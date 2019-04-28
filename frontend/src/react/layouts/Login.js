import React, { Component } from 'react';
import { List, Heading, Img, Paragraph, Button, Card } from '../components/component.lib';

import './layouts.css';
// TODO: maybe add a user and show count

class Login extends Component {
  componentDidMount = () => {

  }

  render = () => {
    return(
      <section
        className='single-card'
      >
        <Card
          className='card login__card'
        >
          <Heading
            className='text-center h1'
            headingType={1}
            innerText='Log In'
          />
          <Paragraph
            className='lead text-center'
          >
            Log in to the application here!
          </Paragraph>

          <form
            className='form--login'
            method='GET'
            action="http://localhost:5000/users/login"
          >
            <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' className="form-control" name='username' required={true}/>
            </div>
            <input type='submit' className='btn btn-primary' name='Submit'/>
          </form>
        </Card>
      </section>
    )
  }
}


export { Login }