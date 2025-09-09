const express = require('express');
const { register, login } = require('../controllers/authController');
const roleAuth = require('../middlewares/role');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

module.exports = router;
