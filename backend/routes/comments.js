const express = require('express');
const User = require('../models/user');
const Genre = require('../models/genre');
const Show = require('../models/show');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * GET all comments
 */
router.get('/', async (req, res) => {
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
router.post('/add', [
  body('comment_body', 'Comment must not be empty').exists({checkFalsy: true})
], async (req, res) => {
  /**
   * NOTE: user_id and show_id should be surmised from hidden form inputs
   * TODO: make sure this can accept form data
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