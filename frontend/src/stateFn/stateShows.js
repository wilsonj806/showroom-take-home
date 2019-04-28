// NOTE if this is supposed to imitate Redux, it'd be better to have a method in <App/> to call this.setState instead
const endpoint = 'http://localhost:5000/shows';

async function fetchShowsList() {
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
        shows: data.shows
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
  fetchShowsList,
}