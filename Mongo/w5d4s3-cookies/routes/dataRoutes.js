const express = require('express');
const { getFav, deleteFav, addfav } = require('../controller/dataControllers');
const router = express.Router();

router.get('/favorites', getFav);

router.post('/add-favorite', addfav);

router.delete('/remove-favorite', deleteFav);

module.exports = router;