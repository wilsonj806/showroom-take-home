/**
 * Express based server
 *
 */

const express = require('express');
const sequelize = require('./models/Sequelize');
const bodyParser = require('body-parser');

// Import Routes
const routeUsers = require('./routes/users');
const routeGenres = require('./routes/genres');

const PORT = process.env.PORT || 5000;

const app = express();

/**
 * Connect to local database
 */

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Use Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', routeUsers);
app.use('/genres', routeGenres);


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

/**
 * Primative testing of Database Model
 */
/*
console.log('Testing Models');

User.findAll({attributes: ["username"]}).then(
  users => {
    const map = users.map(user=> user.dataValues.username);
    console.log(map);
});
Genre.findAll({attributes: ["genre_name"]}).then(
  genres => {
    const map = genres.map(genre=> genre.dataValues.genre_name);
    console.log(map);
});
Comment.findAll({attributes: ["show_id", "comment_body"]}).then(
  comments => {
    const map = comments.map(comment => {
      const { show_id, comment_body } = comment.dataValues;
      return [show_id, comment_body];
    });
    console.log(map);
});
Show.findAll({attributes: ["title"]}).then(
  shows => {
    const map = shows.map(show => show.dataValues.title);
    console.log(map);
}); */