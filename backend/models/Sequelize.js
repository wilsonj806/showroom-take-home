const Sequelize = require('sequelize');
const config = require('../../config/database-config.json');

const sequelize = new Sequelize({
  "dialect": config.dialect,
  "storage": config.storage,
  "define": {
    timestamps: false
  }
});

module.exports = sequelize