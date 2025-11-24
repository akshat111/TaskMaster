const router = require('express').Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/comment.controller');

router.post('/:taskId', auth, commentController.addComment);
router.get('/:taskId', auth, commentController.getCommentsForTask);

module.exports = router;
