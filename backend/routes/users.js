const express = require('express');
const User = require('../models/user');

const router = express.Router();

/**
 * GET single user
 */
router.get('/single/:id', async (req, res) => {
  try {
    console.log(req.params);
    const queryUsers = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    // TODO: Add thing in to return something if no user can be found
    const singleUser = queryUsers.dataValues;
    res.json({users: singleUser});
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
    console.log(queryUsers);
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
router.post('/add', async (req, res) => {
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
      res.status(409).send();
    }
  } catch(error) {
    res.status(500).send();
  }
});

module.exports = router;