# State Management


## State with React

Chances are, there's no time to get state running with Redux and the application is simple enough that the complexity imposed by Redux isn't worth it. We need to keep some of the following:
- list of users
- list of shows
- list of genres
- list of comments
- the user we're currently logged in as
- whether or not we're currently making a HTTP request
- whether or not our lists are up to date
- the table that isn't up to date
- current page
- server messages if any

State shape for use with React:
```ts
// cheating with TypeScript syntax
type TABLES = 'USERS' | 'COMMENTS' | 'SHOWS' | null;

type PAGES = 'SHOWS_LIST' | 'SHOW_PROFILE' | 'USER_PROFILE' | 'USERS_LIST'| 'POST_NEW_USER' | 'POST_NEW_SHOW' | 'HOME'

interface ServerMessage {
  msg: string,
  requestedResource: string
}

type initialState = {
  users: [],
  shows: [],
  genres: [],
  comments: [],
  loggedInAs: number,
  isMakingRequest: boolean,
  isUpToDate: boolean,
  tablesNotUpToDate: TABLES
  currentPage: PAGES,
  serverMessage: Array<ServerMessage> | null
}
```
