/**
 * Route for the list of users
 * ======================================================
 * ======================================================
 * Requests handled:
 * `/users`           : GET all users
 * `/users/register`  : POST new user
 * `/users/login`     : GET single user for login
 *
 * Status:
 * `/users/`         : done
 * `/users/register` : done
 */
const express = require('express');
const User = require('../models/user');

const router = express.Router();

/**
 * POST single user for login
 */
router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const queryUsers = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if(queryUsers == null || queryUsers.length === 0) {
      // TODO flesh this out more
      res.status(404).json({
        status: 404,
        msg: `Error, user with username: ${req.body.username} not found`
      }).send();
    } else {
      res.status(200).json({msg: 'Login Successful'}).send();
    }
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * GET all users
 */
router.get('/', async (req, res) => {
  try {
    const queryUsers = await User.findAll();
    const users = queryUsers.map(user => {
      return {
        id: user.dataValues.id,
        username: user.dataValues.username
      }});
    res.json({users: users});
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * POST new user
 */
router.post('/register', async (req, res) => {
  // TODO: make sure this can accept form data
  const { username } = req.body;
  try {
    const queryUsers = await User.findAll({
      where: {
        username: username
      }
    });
    if(queryUsers.length === 0) {
      await User.create({ username: username });
        /**
         * TODO: change this to a flash message
         * TODO: add proper 201 response headers if possible
         */
      console.log("Registration success");
      res.status(200).send();
    } else {
      // TODO flesh this out more
      res.status(409).json({
        msg: `409 Error, username: ${username} already exists`
      }).send();
    }
  } catch(error) {
    res.status(500).send();
  }
});

module.exports = router;