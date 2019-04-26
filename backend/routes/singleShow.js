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
 * `/show/:id` : GET requests complete
 * `/show/:id` : POST request comlete
 */
const express = require('express');
const Comment = require('../models/comment');

const middleware = require('./middleware/singleShowMiddleware');

const { body, validationResult } = require('express-validator/check');

const router = express.Router();

/**
 * Middleware functions
 */
const { getCommentsForShow, getSingleShow } = middleware;


/**
 * GET single show for a single user and comments
 */
router.get('/:id', getSingleShow, getCommentsForShow);

/**
 * POST new comment
 */
router.post('/:id', [
  body('comment_body', 'Comment must not be empty').exists({checkFalsy: true})
], async (req, res) => {
  /**
   * NOTE: user_id and show_id should be surmised from hidden form inputs
   */
  let errors = validationResult(req);
  const { user_id, comment_body  } = req.body;
  try {
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.mapped()
      }).send();
    } else {
      await Comment.create({
        user_id: user_id,
        show_id: req.params.id,
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