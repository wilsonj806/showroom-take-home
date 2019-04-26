/**
 * Route for the list of shows
 * ======================================================
 * ======================================================
 * Requests handled:
 * `/shows`           : GET all DISTINCT shows
 * `/shows`           : GET all users
 * `/shows/genre/:id` : GET all shows for a specific genre_id
 * `/shows/user/:id`  : GET all shows for a specific user_id
 *
 * Status:
 * `/shows`           : done
 * `/shows/genre/:id` : done
 * `/shows/user/:id`  : done
 */
const express = require('express');
const middleware = require('./middleware/showsMiddleware');

const Show = require('../models/show');

const router = express.Router();

/**
 * Middleware functions
 */
const { getAllShowsAndSort, getUsers } = middleware;

/**
 * GET all DISTINCT shows
 */
router.get('/', getAllShowsAndSort, getUsers);

/**
 * GET all shows for a user
 */
router.get('/user/:id', async (req, res, next) => {
  const queryShows = await Show.findAll({
    where: {
      user_id: req.params.id
    }
  });
  if(queryUsers == null || queryUsers.length === 0) {
    // TODO flesh this out more
    res.status(404).send();
  } else {
    const shows = queryShows.map(show => {
      const { id, title, img_url, genre_id } = show.dataValues
      return {
        id: id,
        title: title,
        img_url: img_url,
        genre_id: genre_id
      }
    });
    res.json({shows: shows});
  }
});

/**
 * GET all shows for a genre and for all users
 */
router.get('/genre/:id', async (req, res, next) => {
  //  attributes: [Sequelize.fn('DISTINCT', Sequelize.col('title')) ,'title'],
  const queryShows = await Show.findAll({
    where: {
      genre_id: req.params.id
    }
  });
  if(queryShows == null || queryShows.length === 0) {
    // TODO flesh this out more
    res.status(404).send();
  } else {
    const shows = queryShows.map(show => {
      const { id, title, img_url } = show.dataValues
      return {
        id: id,
        title: title,
        img_url: img_url
      }
    });
    res.json({
      genre_id: req.params.id,
      shows: shows
    });
  }
});

module.exports = router;