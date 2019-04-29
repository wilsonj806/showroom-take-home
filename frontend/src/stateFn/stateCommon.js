const IDLE = 'IDLE';
const BEGIN = 'BEGIN';
const IN_PROGRESS = 'IN_PROGRESS';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const HOME = 'HOME';
const LOGIN = 'LOGIN';
const USERS = 'USERS';
const USER_PROFILE = 'USER_PROFILE';
const SHOWS = 'SHOWS';
const SHOW_PROFILE = 'SHOW_PROFILE';
const POST_SHOW = 'POST_SHOW';

const locationArr = [HOME, USERS, LOGIN, USER_PROFILE, SHOWS, SHOW_PROFILE, POST_SHOW];
const resetStateVal = (key) => {
  if (typeof key !== 'string') throw new Error('Expecting key to be a string');
  console.log(this);
  this.setState({
    [`${key}`]: null
  });
}

function updateLocation(location) {
  const isValidLocation = locationArr.some(entry => location === entry);
  if(isValidLocation === false) throw new Error('Location does not match with expected values');
  this.setState({currentPage: location});
}

/**
 * Costants
 */
export {
  IDLE,
  BEGIN,
  IN_PROGRESS,
  SUCCESS,
  FAILURE,
  HOME,
  LOGIN,
  USERS,
  USER_PROFILE,
  SHOWS,
  SHOW_PROFILE,
  POST_SHOW
}

/**
 * Utils
 */
export {
  resetStateVal,
  updateLocation
}