const Show = require('../../models/show');
const User = require('../../models/user');

// TODO: Convert this to a INNER JOIN

const getSingleUser = async (req, res, next) => {
  try {
    const queryUsers = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if(queryUsers == null || queryUsers.length === 0) {
      // TODO flesh this out more
      res.json({
        status: 404,
        msg: `Error, user with id: ${req.params.id} not found`
      }).send();
    } else {
      const singleUser = queryUsers.dataValues;
      res.locals.user = singleUser;
    }
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
  next();
}

const getShowsForSingleUser = async (req, res, next) => {
  try {
    const queryShows = await Show.findAll({
      where: {
        user_id: req.params.id
      }
    });
    if(queryShows == null || queryShows.length === 0) {
      res.json({
        status: 200,
        user: res.locals.user
      });
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
      res.json({
        user: res.locals.user,
        shows: shows
      });
    }
  } catch(error) {
    console.log('here be error');
    return console.log(error);
  }
  return;
}

const dbValidator = async (req, res, next) => {
  try {
    const { title } = req.body;
    const dbCall = await Show.findAll({
      where: {
        title: title,
        user_id: req.params.id
      }
    });
    res.locals.dbValidate = dbCall;
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
  next();
}

module.exports = {
  getShowsForSingleUser,
  getSingleUser,
  dbValidator
}