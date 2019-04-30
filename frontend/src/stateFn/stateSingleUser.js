import { BEGIN, SUCCESS, FAILURE, USER_PROFILE, SHOW_PROFILE } from './stateCommon';

const endpoint = 'http://localhost:5000/user/';

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
    // console.log(data);
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

function disposeProfile(profileType = '') {
  if ((profileType === '') || profileType == null) throw new Error('Expecting profileType to be either USER_PROFILE or SHOW_PROFILE');
  this.setState((prevState) => {
    switch(profileType) {
      case USER_PROFILE:
        return {userProfileToShow: null}
      case SHOW_PROFILE:
        return {showProfileToShow: null}
      default:
        return prevState;
    }
  });
}

export {
  fetchSingleUsersProfile,
  disposeProfile
}