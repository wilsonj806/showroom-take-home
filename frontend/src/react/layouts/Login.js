import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { Heading, Paragraph, Card } from '../components/component.lib';

import PropTypes from 'prop-types';

import './layouts.css';
// TODO: maybe add a user and show count

import { LOGIN } from '../../stateFn/stateCommon';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.userNameRef = React.createRef();
  }
  componentDidMount = () => {
    this.props.updateLocation(LOGIN);
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
    const { isLoggedIn } = this.props;
    const redirect = isLoggedIn === true ? <Redirect to='/'/> : null;
    return(
      <section
        className='single-card'
      >
        {redirect}
        <Card
          className='card single-field__card'
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
            className='form--single-field'
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
  isLoggedIn: PropTypes.bool.isRequired,
  queryLoginFn: PropTypes.func.isRequired
}

export { Login }