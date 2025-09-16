const express = require('express');
const { getAllUsers, getUserByName, deleteUser, updateUser} = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');
const roleAuth = require('../middlewares/role');

const router = express.Router();

router.get('/', authentication, roleAuth('Manager'), getAllUsers);

router.get('/:username', authentication, getUserByName);

// router.post('/create', authentication, roleAuth('Manager'))

router.put('/update/:username', authentication, roleAuth('Manager'), updateUser);

router.delete('/delete/:username', authentication, roleAuth('Manager'), deleteUser);

module.exports = router;
