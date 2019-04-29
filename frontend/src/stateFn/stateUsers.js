import { BEGIN, SUCCESS, FAILURE } from "./stateCommon";

// NOTE if this is supposed to imitate Redux, it'd be better to have a method in <App/> to call this.setState instead
const endpoint = 'http://localhost:5000/users';

async function fetchUsersList() {
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      requestStatus: BEGIN,
      isUpToDate: !prevState.isUpToDate
    });
  });
  try {
    const dbCall = await fetch(endpoint);
    const data = await dbCall.clone().json();
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        requestStatus: SUCCESS,
        isUpToDate: !prevState.isUpToDate,
        users: data.users
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

async function queryLogin(username) {
  const init = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: username}),
  }
  const dbCall = await fetch(endpoint + '/login', init);
  const response = await dbCall.clone().json();
  // todo add flash message
  this.setState({
    isLoggedIn: true,
    loggedInAs: {
      id: response.id,
      username: username
    }
  });
}

export {
  fetchUsersList,
  queryLogin
}