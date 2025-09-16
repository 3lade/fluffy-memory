const express = require('express');
const { addUser, getUserByUsernameAndPassword, getAllUsers } = require('../controllers/userController');
const { validateToken } = require('../authUtils');
const { userValidator, loginValidator, inputValidator } = require('../validators/userValidator');

const router = express.Router();

router.post('/addUser', userValidator(), inputValidator, addUser);
router.post('/getUserByUsernameAndPassword', loginValidator(), inputValidator, getUserByUsernameAndPassword);
router.get('/getAllUsers', validateToken, getAllUsers);

module.exports = router;
