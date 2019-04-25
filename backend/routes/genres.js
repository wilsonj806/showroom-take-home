const express = require('express');
const Genre = require('../models/genre');

const router = express.Router();

/**
 * GET all genres
 */
router.get('/', async (req, res) => {
  console.log('hello there');
  try {
    const queryGenres = await Genre.findAll();
    const genres = queryGenres.map(genre => {
      return {
        "id": genre.dataValues.id,
        "genre_name": genre.dataValues.genre_name
      }});
    res.json({genres: genres});
  } catch(error) {
    res.status(500).send();
  }
});

module.exports = router;