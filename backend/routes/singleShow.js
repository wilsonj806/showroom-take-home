/**
 * Route for single show being watched by a single user
 * ======================================================
 * ======================================================
 * Requests handled:
 * `/show/:id` : GET show information
 * `/show/:id` : GET comments list
 * `/show/:id` : POST new comment
 *
 * Status:
 * `/show/:id` : GET requests NOT complete
 * `/show/:id` : POST request partially comlete
 */
const express = require('express');
const Show = require('../models/show');
const Comment = require('../models/comment');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * GET single show for a single user
 */
router.get('/:id', async (req, res) => {
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
 * GET all comments
 */
router.get('/:id', async (req, res) => {
  try {
    const queryComments = await Comment.findAll();
    const comments = queryComments.map(comment => {
      return {
        id: comment.dataValues.id,
        user_id: comment.dataValues.user_id,
        show_id: comment.dataValues.show_id,
        comment_body: comment.dataValues.comment_body
      }});
    res.json({comments: comments});
  } catch(error) {
    res.status(500).send();
  }
});

/**
 * POST new comment
 */
router.post('/:id', [
  body('comment_body', 'Comment must not be empty').exists({checkFalsy: true})
], async (req, res) => {
  /**
   * NOTE: user_id and show_id should be surmised from hidden form inputs
   * TODO: add validation
   */
  let errors = validationResult(req);
  const { user_id, show_id, comment_body  } = req.body;
  try {
    // TODO: Add thing in to return something if no user can be found
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.mapped()
      }).send();
    } else {
      await Comment.create({
        user_id: user_id,
        show_id: show_id,
        comment_body: comment_body
      });
      res.status(200).json({msg: "Success, comment added"}).send();
    }
  } catch(error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;