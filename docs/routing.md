# Routing

## Required Routes

The routes required by the assignment are:
- `/` Homepage
- `/users` Users List
- `/user/:id` Single User's profile
  - shows a list of all of the shows they're watching
  - the list of shows currently watching **MUST** have two columns
- `/users/post` Submit new show
  - user must be logged in to do so
  - the genre is selected via a drop down menu
  - the submitted form should update the database, which will update the app in turn
- `/show/:id` Single show's page
  - shows a list of comments
  - lets you add a new comment
    - new comments should NOT require the user to refresh to see it
- `/shows/` Master list of all shows
  - **shows must not be repeated in this list**

## Initial Routes

Initial routes are meant to be rough. They're separated by their corresponding SQLite table. This is not meant to be permanent!!

Currently routes are separated into the following files:
- comments.js
- genres.js
- shows.js
- users.js

## Final Routes

Final routes will probably look like the below with all requests included:

- `/` Homepage
- `/users` Users List
  - `GET` all users
  - `GET` currently logged in user
- `/user/:id` Single User's profile
  - `GET` user information based on the `:id` param
  - `GET` all shows that the user is watching
    - said query of the shows table **MUST** return:
      - `title`
      - `genre_name` attached to the `genres_id` value
      - `img_url`
- `/user/post` Form to submit a new show that a user is watching
  - `POST` new show that the user is watching
    - said `POST` to the shows table must include:
      - `user_id` surmised from the frontend
      - `genre_id` selected from a drop down of all genres
      - `title` is a text input
      - `img_url` is a text input
- `/shows` Master list of shows
  - `GET` all shows, ignoring any repeats
    - said `GET` request **MUST** return:
      - `user_id` of **ALL** users who are currently watching
        - should also present a link to each user's profile