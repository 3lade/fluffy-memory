const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { dashboard, login } = require('../controllers/shopController');
const routes = express.Router();


routes.post('/login', login);
routes.get('/dashboard', authMiddleware, roleMiddleware, dashboard);


module.exports = routes;