// NOTE if this is supposed to imitate Redux, it'd be better to have a method in <App/> to call this.setState instead
import { BEGIN, SUCCESS, FAILURE } from './stateCommon';

const endpoint = 'http://localhost:5000/shows';

async function fetchShowsList() {
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
        shows: data.shows
      });
    });
  } catch(error) {
    console.log(error);
  }
  this.setState((prevState)=> {
    return Object.assign({}, prevState, {
      requestStatus: FAILURE
    });
  });
}

export {
  fetchShowsList,
}