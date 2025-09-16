const express = require('express');
const authentication = require('../middleware/auth');
const { getAllUsers, updatePassword } = require('../controller/userController');

const userRoutes = express.Router();

userRoutes.get('/', authentication, getAllUsers);

// userRoutes.get('/:username', );

userRoutes.put('/update/:username', authentication, updatePassword);

// userRoutes.delete('/delete/:username', );

module.exports = userRoutes;