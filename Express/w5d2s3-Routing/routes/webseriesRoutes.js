const express = require('express');
const { GettingWeb, postWeb, gettingWebId } = require('../controllers/webseriesController');

const router = express.Router()

router.get('/', GettingWeb)
router.post('/', postWeb)
router.get('/:id', gettingWebId)

module.exports={router};