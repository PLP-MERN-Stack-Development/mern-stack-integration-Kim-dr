const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
} = require('../controllers/authController');
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require('../utils/validators');
const { protect } = require('../middleware/auth');

router.post('/register', registerValidationRules(), validate, register);
router.post('/login', loginValidationRules(), validate, login);
router.get('/me', protect, getMe);

module.exports = router;