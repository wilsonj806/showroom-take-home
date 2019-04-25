const express = require('express');
const User = require('../models/user');
const Genre = require('../models/genre');
const Show = require('../models/show');
const Comment = require('../models/comment');

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

module.exports = router;