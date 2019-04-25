const express = require('express');
const Show = require('../models/show');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * GET single show for a single user
 */
router.get('/single/:id', async (req, res) => {
  try {
    const queryShows = await Show.findOne({
      where: {
        id: req.params.id
      }
    });
    // TODO: Add thing in to return something if no user can be found
    const singleShow = queryShows.dataValues;
    res.json({show: singleShow});
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * GET all shows for all users
 */
router.get('/', async (req, res) => {
  try {
    const queryShows = await Show.findAll();
    const shows = queryShows.map(show => {
      return {
        id: show.dataValues.id,
        title: show.dataValues.title,
        img: show.dataValues.img_url,
        genres_id: show.dataValues.genres_id,
        user_id: show.dataValues.user_id
      }});
    res.json({shows: shows});
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * GET all DISTINCT shows
 */
router.get('/unique', async (req, res) => {
  try {
    const queryShows = await Show.findAll();

    const reduced = queryShows.reduce((acc, show, i) => {
      const { id, title, img_url, genre_id, user_id } = show.dataValues;
      const showObj = {
        title: title,
        ids: [],
        img_url: img_url,
        genre_id: genre_id,
        users_watching: []
      };

      const showExists = acc.some((accShow, j) =>{
        return accShow.title === title;
      });

      if (showExists === true && acc.length !== 0) {
        const indexExisting = acc.findIndex((accShow) =>{
            return accShow.title === title;
        });
        acc[indexExisting].users_watching.push(user_id);
        acc[indexExisting].ids.push(id);
        return acc;
      } else {
        showObj.users_watching.push(user_id);
        showObj.ids.push(id);
        acc.push(showObj);
        return acc;
      }
      }, []);
    res.json({unique_shows: reduced});
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * POST new show that a user is watching
 */
router.post('/add', [
  body('title', 'Title must not be empty').exists({checkFalsy: true}),
  body('img_url', 'Image URL must not be empty').exists({checkFalsy: true}),
  body('genre_id', 'Genre must not be empty').exists({checkFalsy: true}),
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