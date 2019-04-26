const Show = require('../../models/show');
const Comment = require('../../models/comment');

const getSingleShow = async (req, res, next) => {
  try {
    const queryShows = await Show.findOne({
      where: {
        id: req.params.id
      }
    });
    if(queryShows == null || queryShows.length === 0) {
      // TODO flesh this out more
      res.status(404).send();
    } else {
      const singleShow = queryShows.dataValues;
      res.locals.show = singleShow;
    }
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
  next();
}

const getCommentsForShow = async (req, res, next) => {
  try {
    const queryComments = await Comment.findAll();
    const comments = queryComments.map(comment => {
      return {
        id: comment.dataValues.id,
        user_id: comment.dataValues.user_id,
        show_id: comment.dataValues.show_id,
        comment_body: comment.dataValues.comment_body
      }});
    res.json({
      singleShow: res.locals.show,
      comments: comments
    });
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
  next();
}

module.exports = {
  getCommentsForShow,
  getSingleShow
}