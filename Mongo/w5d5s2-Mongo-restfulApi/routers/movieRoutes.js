const express = require('express');
const validation = require('../middleware/validation');
const { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, updateMultipleMovies } = require('../controllers/movieController');
const router = express.Router();

//adding a new movie
router.post('/', validation, createMovie);

//getting all movies
router.get('/', getAllMovies);

//getting a movie by id
router.get('/:_id', getMovieById);

//updating a movie
router.put('/:_id', validation, updateMovie);

//deleting a movie
router.delete('/:_id', deleteMovie);

//updating multiple movies
// router.patch('/', updateMultipleMovies);


module.exports = router;