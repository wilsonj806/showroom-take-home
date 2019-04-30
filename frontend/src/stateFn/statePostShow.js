import { BEGIN, SUCCESS, FAILURE } from './stateCommon';

const genreEndpoint = 'http://localhost:5000/user/post/';

async function getGenres() {
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      requestStatus: BEGIN,
      isUpToDate: !prevState.isUpToDate
    });
  });
  try {
    const dbCall = await fetch(genreEndpoint);
    const data = await dbCall.clone().json();
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        requestStatus: SUCCESS,
        isUpToDate: !prevState.isUpToDate,
        genres: data.genres
      });
    });
  } catch(error) {
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        requestStatus: FAILURE
      });
    });
    console.log(error);
  }
}

async function queryShows(formData) {
  const { user_id, genre_id, title, img_url } = formData;
  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: user_id,
      genre_id: genre_id,
      title: title,
      img_url: img_url
    })
  };
  try {
    const dbCall = await fetch((genreEndpoint + user_id), init);
    const response = await dbCall.clone().json();
    // console.log(response);
    // TODO add flash message
    this.setState({
      msg: response.msg
    });
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export {
  getGenres,
  queryShows
}