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
        username: req.params.id
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
router.post('/single', (req, res) => {

});

module.exports = router;