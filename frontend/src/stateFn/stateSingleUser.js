import { BEGIN, SUCCESS, FAILURE } from './stateCommon';

const endpoint = 'http://localhost:5000/user/search/';

async function fetchSingleUsersProfile(userId = null) {
  if (userId == null) throw new Error('Error');
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      requestStatus: BEGIN,
    });
  });
  try {
    const modifiedEndpoint = endpoint + userId;
    const dbCall = await fetch(modifiedEndpoint)
    const data = await dbCall.clone().json();
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        requestStatus: SUCCESS,
        userProfileToShow: {
          user: data.user,
          shows: data.shows
        }
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

  return;
}

export {
  fetchSingleUsersProfile,
}