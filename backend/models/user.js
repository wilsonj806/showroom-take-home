const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING
  }
});

module.exports = User;
