const Sequelize = require('sequelize');
const sequelize = require('./Sequelize');

const Comment = sequelize.define('comment', {
  user_id: {
    type: Sequelize.INTEGER
  },
  show_id: {
    type: Sequelize.INTEGER
  },
  comment_body: {
    type: Sequelize.STRING
  },
});

module.exports = Comment;
