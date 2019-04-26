/**
 * Route for a single user's profile
 * ======================================================
 * ======================================================
 * Requests handled:
 * `/user/post` : POST new show for logged in user
 * `/user/post` : GET genres
 * `/user/:id`  : GET single user information
 *
 * Status:
 * `/user/post` : done
 * `/user/:id`  : done
 */
const express = require('express');
const Show = require('../models/show');
const User = require('../models/user');
const Genre = require('../models/genre');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * GET all genres
 *  this is for filling out the form
 */
router.get('/post', async (req, res) => {
  try {
    const queryGenres = await Genre.findAll();
    const genres = queryGenres.map(genre => {
      return {
        id: genre.dataValues.id,
        genre_name: genre.dataValues.genre_name
      }});
    res.json({genres: genres});
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

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
    if(queryUsers == null || queryUsers.length === 0) {
      // TODO flesh this out more
      res.status(404).send();
    } else {
      const singleUser = queryUsers.dataValues;
      res.json({users: singleUser});
    }
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