const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  searchPosts,
} = require('../controllers/postController');
const {
  postValidationRules,
  commentValidationRules,
  validate,
} = require('../utils/validators');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Search route (must be before /:idOrSlug)
router.get('/search', searchPosts);

router
  .route('/')
  .get(getPosts)
  .post(
    protect,
    upload.single('featuredImage'),
    postValidationRules(),
    validate,
    createPost
  );

// GET by ID or slug
router.get('/:idOrSlug', getPost);

// PUT and DELETE by ID only
router.put(
  '/:id',
  protect,
  upload.single('featuredImage'),
  postValidationRules(),
  validate,
  updatePost
);

router.delete('/:id', protect, deletePost);

router
  .route('/:id/comments')
  .post(protect, commentValidationRules(), validate, addComment);

module.exports = router;