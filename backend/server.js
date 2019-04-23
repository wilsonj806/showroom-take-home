/**
 * Express based server
 *
 */

const express = require('express');
const sequelize = require('./models/Sequelize');
const User = require('./models/user');
const Genre = require('./models/genre');
const Comment = require('./models/comment');
const Show = require('./models/show');
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

/**
 * Primative testing of Database Model
 */

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
});