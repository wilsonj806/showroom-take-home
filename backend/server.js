/**
 * Express based server
 *
 */

const express = require('express');
const Sequelize = require('sequelize');
const config = require('../config/database-config.json');

/**
 * Connect to local database
 */

const sequelize = new Sequelize({
  "dialect": config.dialect,
  "storage": config.storage
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });