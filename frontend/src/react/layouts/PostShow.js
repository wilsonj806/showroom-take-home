import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { Heading, Paragraph, Card } from '../components/component.lib';

import PropTypes from 'prop-types';

import './layouts.css';
// TODO: maybe add a user and show count

import { POST_SHOW } from '../../stateFn/stateCommon';

const localState = {
  user_id: null,
  genre_id: null,
  title: null,
  img_url: null
};

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = localState;
    this.userNameRef = React.createRef();
  }
  componentDidMount = () => {
    if (this.state.user_id == null) {
      const split = this.props.location.pathname.split(/\//);
      this.setState({user_id: split[3]});
    }
    this.props.updateLocation(POST_SHOW);

  }

  componentWillUnmount = () => {
    this.setState(localState);
    this.userIdRef.current.value = '';
  }
  onSubmitFn = (event) => {
    event.preventDefault();
    this.props.queryShowsFn(this.state);
    this.setState(localState);
    this.userNameRef.current.value = '';
  }

  onChangeFn = () => {
    this.setState({username: (this.userNameRef.current.value)});
  }

  render = () => {
    const { loggedInAs } = this.props;
    const redirect = (loggedInAs == null) ? <Redirect to='/users/login'/> : null;
    return(
      <section
        className='single-card'
      >
        {redirect}
        <Card
          className='card post-show'
        >
          <Heading
            className='text-center h1'
            headingType={1}
            innerText='Add a new show'
          />
          <Paragraph
            className='lead text-center'
          >
            Add a new show to the user profile
          </Paragraph>

          <form
            className='form--post-show'
            onSubmit={this.onSubmitFn}
          >
            <div className='form-group'>
            <input
              type='text'
              hidden={true}
              name='user_id'
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

PostShow.propTypes = {

}

export { PostShow }