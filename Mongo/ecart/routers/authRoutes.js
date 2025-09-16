const express = require('express');
const { validateToken } = require('../middleware/auth');
const { login, register } = require('../controller/authController');
const { validateRegister, validateLogin, handleValidationErrors } = require('../validators/authValidator');

const authRoutes = express.Router();

// Register route with validation
authRoutes.post('/register', validateRegister, handleValidationErrors, register);

// Login route with validation
authRoutes.post('/login', validateLogin, handleValidationErrors, login);

module.exports = authRoutes;