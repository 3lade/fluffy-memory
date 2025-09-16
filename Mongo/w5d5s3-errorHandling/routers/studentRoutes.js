const express = require('express');
const { createStudent, getAllStudents, updateStudent, deleteStudent } = require('../controllers/studentController');
const validation = require('../middlewares/validation');
const routes = express.Router();

routes.post('/', validation, createStudent); //not using the validation middleware here will also work as validation is done in controller
routes.get('/', getAllStudents);
routes.put('/:_id', updateStudent);
routes.delete('/:_id', deleteStudent);


module.exports = routes;