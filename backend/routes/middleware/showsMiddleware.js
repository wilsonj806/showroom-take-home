const Show = require('../../models/show');
const User = require('../../models/user');
const Genre = require('../../models/genre');


const getAllShowsAndSort = async (req, res, next) => {
  // TODO: shrink this down if possible
  try {
    const queryShows = await Show.findAll({include: [{model: Genre}, {model: User}]});

    const reduced = queryShows.reduce((acc, show, i) => {
      const { id, title, img_url, genre, user } = show.dataValues;
      const showObj = {
        ids: [],
        users_watching: [],
        title: title,
        img_url: img_url,
        genre_id: genre.dataValues.id,
        genre_name: genre.dataValues.genre_name,
        has_repeats: false
      };

      const showExists = acc.some((accShow, j) => accShow.title === title);
      if (showExists === true && acc.length !== 0) {
        const indexExisting = acc.findIndex((accShow) =>{
            return accShow.title === title;
        });
        acc[indexExisting].users_watching.push(user.dataValues);
        acc[indexExisting].ids.push(id);
        acc[indexExisting].has_repeats = true;
        return acc;
      } else {
        showObj.users_watching.push(user.dataValues);
        showObj.ids.push(id);
        acc.push(showObj);
        return acc;
      }
      }, []);
      console.log('hi');
      res.json({
        shows: reduced,
      });
  } catch(error) {
    res.status(500).send();
  }
  next();
}

module.exports = {
  getAllShowsAndSort,
}