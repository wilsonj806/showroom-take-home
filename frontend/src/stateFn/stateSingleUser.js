import { BEGIN, SUCCESS, FAILURE } from './stateCommon';

const endpoint = 'http://localhost:5000/user/search/';

async function fetchSingleUsersProfile(userId = null) {
  if (userId == null) throw new Error('Error');
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      isMakingRequest: BEGIN,
    });
  });
  try {
    const modifiedEndpoint = endpoint + userId;
    console.log(modifiedEndpoint);
    const dbCall = await fetch(modifiedEndpoint)
    const data = await dbCall.clone().json();
    console.log(data);
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        isUpToDate: SUCCESS,
        userProfileToShow: {
          user: data.user,
          shows: data.shows
        }
      });
    });
  } catch(error) {
    return console.log(error);
  }

  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      isMakingRequest: FAILURE
    });
  });
  return;
}

export {
  fetchSingleUsersProfile,
}