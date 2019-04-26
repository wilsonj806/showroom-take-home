/**
 * Express based server
 *
 * TODO
 *  add additional validation if needed
 *  add messages/ responses that the UI will render if there are errors
 *  check if SQL queries can be turned into whatever types of JOINs there are

 */
const express = require('express');
const sequelize = require('./models/Sequelize');
const bodyParser = require('body-parser');

// Import Routes
const routeUsers = require('./routes/users');
const routeSingleUser = require('./routes/singleUser');
const routeSingleShow = require('./routes/singleShow');
const routeShows = require('./routes/shows');

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

app.use('/show', routeSingleShow);
app.use('/shows', routeShows);
app.use('/user', routeSingleUser);
app.use('/users', routeUsers);


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
