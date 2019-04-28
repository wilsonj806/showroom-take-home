// NOTE if this is supposed to imitate Redux, it'd be better to have a method in <App/> to call this.setState instead
async function fetchUsersList() {
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      isMakingRequest: !prevState.isMakingRequest,
      isUpToDate: !prevState.isUpToDate
    });
  });
  try {
    const dbCall = await fetch('http://localhost:5000/users');
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

export {
  fetchUsersList
}