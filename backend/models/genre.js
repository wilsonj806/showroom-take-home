const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');

const Genre = sequelize.define('genre', {
  genre_name: {
    type: Sequelize.STRING
  }
});

module.exports = Genre;
