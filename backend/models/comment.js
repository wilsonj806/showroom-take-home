const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');

const Comment = sequelize.define('comment', {
  user_id: {
    type: Sequelize.INTEGER,
    references: 'user',
    referencesKey: 'id'
  },
  show_id: {
    type: Sequelize.INTEGER,
    references: 'show',
    referencesKey: 'id'
  },
  comment_body: {
    type: Sequelize.STRING
  },
});

module.exports = Comment;
