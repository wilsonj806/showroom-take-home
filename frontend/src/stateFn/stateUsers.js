// NOTE if this is supposed to imitate Redux, it'd be better to have a method in <App/> to call this.setState instead
const endpoint = 'http://localhost:5000/users';

async function fetchUsersList() {
  console.log(this);
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      isMakingRequest: !prevState.isMakingRequest,
      isUpToDate: !prevState.isUpToDate
    });
  });
  try {
    const dbCall = await fetch(endpoint);
    const data = await dbCall.clone().json();
    this.setState((prevState)=> {
      return Object.assign({}, prevState, {
        isUpToDate: !prevState.isUpToDate,
        users: data.users
      });
    });
  } catch(error) {
    console.log(error);
  }
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      isMakingRequest: !prevState.isMakingRequest
    });
  });
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
  console.log(response);
  this.setState({
    isLoggedIn: true,
    loggedInAs: username
  });
}

export {
  fetchUsersList,
  queryLogin
}