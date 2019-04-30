const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');
const Genre = require('./genre');
const User = require('./user');

const Show = sequelize.define('show', {
  user_id: {
    type: Sequelize.INTEGER,
    references: User,
    referencesKey: 'id'
  },
  genre_id: {
    type: Sequelize.INTEGER,
    references: Genre,
    referencesKey: 'id'
  },
  title: {
    type: Sequelize.STRING
  },
  img_url: {
    type: Sequelize.STRING
  },
}, {underscored: true});

User.hasMany(Show);
Show.belongsTo(User);

Genre.hasMany(Show);
Show.belongsTo(Genre);

module.exports = Show;
