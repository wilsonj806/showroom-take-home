const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');

const Show = sequelize.define('show', {
  user_id: {
    type: Sequelize.INTEGER
  },
  genre_id: {
    type: Sequelize.INTEGER
  },
  title: {
    type: Sequelize.STRING
  },
  img_url: {
    type: Sequelize.STRING
  },
});

module.exports = Show;
