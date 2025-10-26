const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const {
  categoryValidationRules,
  validate,
} = require('../utils/validators');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getCategories)
  .post(
    protect,
    authorize('admin'),
    categoryValidationRules(),
    validate,
    createCategory
  );

router
  .route('/:id')
  .get(getCategory)
  .put(
    protect,
    authorize('admin'),
    categoryValidationRules(),
    validate,
    updateCategory
  )
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;