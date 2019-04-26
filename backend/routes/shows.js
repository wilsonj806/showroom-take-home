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

const Show = require('../models/show');
const User = require('../models/user');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * Middleware functions
 *
 */
const getDistinctShowsAndUsers = async (req, res, next) => {
  try {
    const queryShows = await Show.findAll();

    const reduced = queryShows.reduce((acc, show, i) => {
      const { id, title, img_url, genre_id, user_id } = show.dataValues;
      const showObj = {
        ids: [],
        users_watching: [],
        title: title,
        img_url: img_url,
        genre_id: genre_id,
        has_repeats: false
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
        acc[indexExisting].has_repeats = true;
        return acc;
      } else {
        showObj.users_watching.push(user_id);
        showObj.ids.push(id);
        acc.push(showObj);
        return acc;
      }
      }, []);
    res.locals.distinctShows = reduced;
  } catch(error) {
    res.status(500).send();
  }
  next();
}
const getUsers = async (req, res, next) => {
  try {
    const queryUsers = await User.findAll();
    const users = queryUsers.map(user => {
      return {
        id: user.dataValues.id,
        username: user.dataValues.username
      }});
    res.json({
      shows: res.locals.distinctShows,
      users: users
    });
  } catch(error) {
    res.status(500).send();
  }
  next();
}

/**
 * GET all DISTINCT shows
 */
router.get('/', getDistinctShowsAndUsers, getUsers);

/**
 * GET all shows for a user
 */
router.get('/user/:id', async (req, res, next) => {
  const queryShows = await Show.findAll({
    where: {
      user_id: req.params.id
    }
  });
  if(queryUsers.length === 0) {
    // TODO flesh this out more
    res.status(409).send();
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
  // TODO: Add provisions for handling genre id not found
  //  attributes: [Sequelize.fn('DISTINCT', Sequelize.col('title')) ,'title'],
  const queryShows = await Show.findAll({
    where: {
      genre_id: req.params.id
    }
  });
  if(queryUsers.length === 0) {
    // TODO flesh this out more
    res.status(409).send();
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