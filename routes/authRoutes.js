const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const {
  register,
  login,
} = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Validation middleware
const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage('Valid email required'),
  body('password')
    .notEmpty()
    .withMessage('Password required'),
];

// Normal user login
router.post('/login', validateLogin, login);

// Admin-only login
router.post('/admin-login', validateLogin, login, authorize('admin'));

router.post('/register', validateRegister, register);

module.exports = router;
