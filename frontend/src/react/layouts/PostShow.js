import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { Heading, Paragraph, Card } from '../components/component.lib';

import PropTypes from 'prop-types';

import './layouts.css';
// TODO: maybe add a user and show count

import { POST_SHOW } from '../../stateFn/stateCommon';

const localState = {
  user_id: '',
  genre_id: '',
  title: '',
  img_url: '',
};

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = localState;
    this.titleRef = React.createRef();
    this.imgRef = React.createRef();
    this.genreRef = React.createRef();
  }
  componentDidMount = () => {
    if (this.state.user_id === '') {
      const split = this.props.location.pathname.split(/\//);
      console.log(split);
      this.setState({user_id: `${split[3]}`});
      if (this.props.genres.length === 0) {
        this.props.getGenresFn();
      }
    }
    this.props.updateLocation(POST_SHOW);
  }

  componentWillUnmount = () => {
    this.setState(localState);
    this.titleRef.current.value = '';
  }
  onSubmitFn = (event) => {
    event.preventDefault();
    console.log(this.state);
    const result = this.props.queryShowsFn(this.state);
    if (result !== true) {
      this.setState((prevState) => Object.assign({}, localState, {user_id: prevState.user_id}));
      this.titleRef.current.value = '';
      this.genreRef.current.value = '';
      this.imgRef.current.value = '';
    }
  }

  onChangeFn = () => {
    this.setState({
      genre_id: this.genreRef.current.value,
      title: this.titleRef.current.value,
      img_url: this.imgRef.current.value,
    });
  }

  populateGenres = () => {
    const { genres } = this.props;
    const options = (genres.length !== 0) ? genres.map((genre) => {
      return (
        <option value={parseInt(genre.id)}>{genre.genre_name}</option>
      )
    }) : null;
    const select = (
      <select
        required={true}
        id="genre-list"
        className="form-control"
        value={this.state.genre_id}
        onChange={this.onChangeFn}
        ref={this.genreRef}
        >
          <option value="">--Please choose an option--</option>
          {options}
      </select>
    );
    return select;
  }

  render = () => {
    const { loggedInAs, isLoggedIn } = this.props;
    const split = this.props.location.pathname.split(/\//);
    const redirect = (isLoggedIn === false || loggedInAs.id !== parseInt(split[3])) ? <Redirect push to='/users/login'/> : null;
    return(
      <section
        className='single-card'
      >
        {redirect}
        <Card
          className='card post-show'
          style={cardStyle}
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
            <label htmlFor='title'>Show Title</label>
            <input
              type='text'
              name='title'
              required={true}
              className="form-control"
              onChange={this.onChangeFn}
              ref={this.titleRef}
              />
            </div>
            <div className='form-group'>
            <label htmlFor='img-url'>Show Image</label>
            <input
              type='url'
              name='img-url'
              required={true}
              className="form-control"
              onChange={this.onChangeFn}
              ref={this.imgRef}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='genre-list'>Genre</label>
              {this.populateGenres()}
            </div>
            <input type='submit' className='btn btn-primary' name='Submit'/>
          </form>
        </Card>
      </section>
    )
  }
}

const cardStyle = {
  padding: '2rem 1.75rem'
}

PostShow.propTypes = {
  getGenresFn: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      genre_name: PropTypes.string
    })
  )
}

export { PostShow }