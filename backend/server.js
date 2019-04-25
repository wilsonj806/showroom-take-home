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
const routeShows = require('./routes/shows');
const routeComments = require('./routes/comments');

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
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', routeUsers);
app.use('/genres', routeGenres);
app.use('/shows', routeShows);
app.use('/comments', routeComments);


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
