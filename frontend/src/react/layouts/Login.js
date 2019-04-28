import React, { Component } from 'react';
import { List, Heading, Img, Paragraph, Button, Card } from '../components/component.lib';

import PropTypes from 'prop-types';

import './layouts.css';
import { query } from 'express-validator/check';
// TODO: maybe add a user and show count

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.userNameRef = React.createRef();
  }
  componentDidMount = () => {

  }

  componentWillUnmount = () => {
    this.setState({username: ''});
    this.userNameRef.current.value = '';
  }
  onSubmitFn = (event) => {
    event.preventDefault();
    this.props.queryLoginFn(this.state.username);
    this.setState({username: ''});
    this.userNameRef.current.value = '';
  }

  onChangeFn = () => {
    this.setState({username: (this.userNameRef.current.value)});
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
            onSubmit={this.onSubmitFn}
          >
            <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              className="form-control"
              name='username'
              required={true}
              onChange={this.onChangeFn}
              ref={this.userNameRef}
              />
            </div>
            <input type='submit' className='btn btn-primary' name='Submit'/>
          </form>
        </Card>
      </section>
    )
  }
}

Login.propTypes = {
  queryLoginFn: PropTypes.func.isRequired
}

export { Login }