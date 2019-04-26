const Show = require('../../models/show');
const User = require('../../models/user');


const getAllShowsAndSort = async (req, res, next) => {
  // TODO: shrink this down if possible
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

      const showExists = acc.some((accShow, j) => accShow.title === title);
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

module.exports = {
  getAllShowsAndSort,
  getUsers
}