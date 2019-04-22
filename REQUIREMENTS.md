# Showroom
## Take Home Technical Challenge

### Opening Remarks

You will be submitting a full stack application for this challenge. The technologies you must use:
- **Frontend:** React
  - Use create-react-app
  - Use react-router-dom
  - Bootstrap or equivalent
- **Backend:** Express, Sequelize w/ SQLite

You will be submitting a GITHUB repo with two seperate folders:
- `/backend`
- `/frontend`

## TV Show Watchlist App

TV Show Watchlist will be a full-stack application where users can post, comment on, and favorite TV shows that they are binging on.

* The app does **not** need user authentication, and does not need passwords - only usernames. You can assume from the front end that your logged in user is whichever user ID from the database you wish to be the logged in user.
* Users should be able to **post shows** that they watch. These shows are shared on their profile pages.
* Users can view the profile pages of other users.
* Users should be able to **comment** on other users' shows. Comments should include the comment's text as well as the username of the user who posted the comment.

### Database Structure

The following tables and columns will be necessary.
Make sure to prepopulate your database with data. We will be evaluating your code application, so make sure there are data inserted.

- **Users**
  - id
  - username - *Unique*
- **Genres**
  - id
  - genre_name - *Unique*
- **Shows**
  - id
  - title
  - img_url
  - user_id - *References Users*
  - genre_id - *References Genres*
- **Comments**
  - id
  - comment_body
  - user_id - *References Users*
  - show_id - *References Shows*

### API Endpoints

Your API Endpoints should include at least:

- **Users**
  - GET all users
  - GET single user
  - POST new user
- **Genres**
  - GET all genres
- **Shows**
  - GET all shows
  - GET all shows for specific genre_id
  - GET all shows for specific user_id
  - GET one show
  - POST new show
- **Comments**
  - GET all comments for specific show_id
  - POST new comment

### Frontend

Your frontend must include the following routes/pages:

| Mockup | Feature |
| ---    | ---     |
| <img src='assets/Home.png' width='300'> | **`/` :** Home route. Should just welcome the user to the applciation. Must include Navbar, links, display message.
| <img src='assets/Users.png' width='300'> | **`/users` :** Shows master list of all users. Shows the "logged in" user. Should be able to click on each username linking to the user profile page.
| <img src='assets/User-Watching.png' width='300'> |  **`/user/:id` :** User profile page. Shows all the shows the user is watching. Must show the image, title, genre. Should be able to click on the show and take you to the show page. Each row should have TWO shows per row; note the mockup isn't reflecting that.
| <img src='assets/User-Post.png' width='300'> | **`/user/post` :** Shows a form where the logged in user can add a new show. Should be able to submit to the Database. These changes are reflected app wide. Selecting the genre is a drop down. This data should be reflecting the genres in the database.
| <img src='assets/User-Show.png' width='300'> |  **`/show/:id` :** A specific show's profile page for a specific user. Shows the title, image, genre, number of comments and list of comments. Allows you to add new comments. The comment should be reflected immediately on the list without needing to refresh the page.
| <img src='assets/Shows.png' width='300'> |  **`/shows` :** Masterlist of all the shows. **Don't repeat the same show twice.** For each show list all the users who are watching. Clicking on the name of the user takes you to that specific users' show profile page. We are assuming that the name of the show has to match exactly to be considered the same show.
