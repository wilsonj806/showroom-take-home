## State for Redux

Redux isn't being used but here are some general notes for future reference.

### State for database calls

This is an example store for all data from the database.

```js
  const initialState = {
    users: [],
    showsWatching: [],
    genres: [],
  };
```

The current concern is how to make the requests to populate or update the store asynchronously.

Reference the below:
- [Article](https://daveceddia.com/where-fetch-data-redux/)
- [example](https://codesandbox.io/s/j3378m4v3y)
- [redux docs](https://redux.js.org/advanced/async-actions)

TL; DR your async action becomes a function and convention says you need one for:
1.) BEGIN_REQUEST
2.) REQUEST_SUCCESS
3.) REQUEST_FAIL
```js
const fetchAllUsersBegin= () => {
  return {
    type: FETCH_ALL_USERS_BEGIN
  }
}
const fetchAllUsersSuccess = (users) => {
  return {
    type: FETCH_ALL_USERS_SUCCESS,
    dbPayload: users
  }
}
const fetchAllUsersFail = (error) => {
  return {
    type: FETCHALL_USERS_FAILURE,
    dbPayload: error
  }
}

// because the action functions return an object we can call it like normal in a reducer:
const reducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_ALL_USERS_BEGIN:
      return Object.assign({}, state, {isFetching: true});
    case FETCH_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        dbPayload: action.dbPayload
      });
    default:
      return state
  }
}
```

Then the component would call it like so:
```js
const fetchStuff = () => dispatch => {
  dispatch(fetchAllUsers);
  return fetchUsersFn()
    .then(json => {
      dispatch(fetchAllUsersSuccess(json.users))
      return json.users;
    })
    .catch(err => dispatch(fetchAllUsersFail(err)))
}

```

### State for the UI

State for the UI looks something like this:

```js
// NOTE: orderBy is bonus
  const orderBy = {
    ALPHABETICAL_ASCENDING: "ALPHABETICAL_ASCENDING",
    ALPHABETICAL_DESCENDING: "ALPHABETICAL_DESCENDING"
  }
  const exampleStore = {
    currentPage: "",
    loggedInAs: "",
    orderBy: orderBy.ALPHABETICAL_ASCENDING
  }
```
