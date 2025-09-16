const express = require('express');
const { addUser, getUserByUsernameAndPassword, getAllUsers } = require('../controller/userController');

const userRoute = express.Router();

userRoute.post('/', addUser)
userRoute.get('/byUser', getUserByUsernameAndPassword)
userRoute.get('/', getAllUsers)

module.exports = userRoute;