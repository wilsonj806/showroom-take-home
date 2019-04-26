/**
 * Route for a single user's profile
 * ======================================================
 * ======================================================
 * Requests handled:
 * `/user/post` : POST new show for logged in user
 * `/user/:id`  : GET single user information
 *
 * Status:
 * `user/post` : done
 * `user/:id`  : done
 */
const express = require('express');
const Show = require('../models/show');
const User = require('../models/user');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * GET single user
 */
router.get('/:id', async (req, res) => {
  try {
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
 * POST new show that a user is watching
 */
router.post('/post', [
  body('title', 'Title must not be empty').exists({checkFalsy: true}),
  body('img_url', 'Image URL must not be empty').exists({checkFalsy: true}),
  body('user_id', 'User id must not be empty').exists({checkFalsy: true}),
  body('genre_id', 'Genre must not be empty').exists({checkFalsy: true})
], async (req, res) => {
  /**
   * NOTE: user_id should be surmised from hidden form inputs
   * TODO: make sure this can accept form data
   * TODO: add validation to make sure that an entry for that show doesn't exist already
   */
  let errors = validationResult(req);
  const { user_id, genre_id, title, img_url  } = req.body;
  try {
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.mapped()
      }).send();
    } else {
      await Show.create({
        user_id: user_id,
        genre_id: genre_id,
        title: title,
        img_url: img_url
      });
      res.status(200).json({
        msg: `Success, show added. ${title} added to the profile of user with id: ${user_id}`,
      }).send();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;