# State Management

## State for database calls

This is an example store for all calls to the database.

```js
  const exampleStore = {
    users: [],
    showsWatching: [],
    genres: [],
  };
```

## State for the UI

State for the UI looks something like this:

```js
// NOTE: orderBy is bonus
  const orderBy = {
    ALPHABETICAL_ASCENDING: "ALPHABETICAL_ASCENDING",
    ALPHABETICAL_DESCENDING: "ALPHABETICAL_DESCENDING"
  }
  const exampleStore = {
    loggedInAs: "",
    orderBy: orderBy.ALPHABETICAL_ASCENDING
  }
```
