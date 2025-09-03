const express = require('express');
const { getAllReg, getRegByID, createReg, updatePutReg, updatePatchReg, deleteReg } = require('../controllers/registerController');
const { inputValidation } = require('../middlewares/validation');
const { timestampMiddleware } = require('../middlewares/timeStamp');

const routes = express.Router();

routes.get('/', getAllReg);

routes.get('/:id', getRegByID);

routes.post('/', inputValidation, timestampMiddleware, createReg);

routes.put('/:id',inputValidation, updatePutReg);

routes.patch('/:id',inputValidation, updatePatchReg);

routes.delete('/:id', deleteReg);

routes.all('*', (req, res) => {
    res.status(404).json({error: "Router not defined."})
});

module.exports = routes;