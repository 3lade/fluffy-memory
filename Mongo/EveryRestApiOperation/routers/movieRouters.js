const express = require('express');
const { movieValidator, inputValidator } = require('../middleware/expressValidator');
const { 
    createMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie, 
    updateMultipleMovies,
    deleteMultipleMovies,
    getMoviesByGenre,
    getMoviesByDirector,
    searchMovies
} = require('../controllers/movieController');

const router = express.Router();

// Create a new movie
router.post('/', movieValidator(), inputValidator, createMovie);

// Get all movies
router.get('/', getAllMovies);

// Search movies by title or director
router.get('/search', searchMovies);

// Get movies by genre
router.get('/genre/:genre', getMoviesByGenre);

// Get movies by director
router.get('/director/:director', getMoviesByDirector);

// Get a movie by id
router.get('/:_id', getMovieById);

// Update a movie
router.put('/:_id', movieValidator(), inputValidator, updateMovie);

// Partially update a movie
router.patch('/:_id', updateMovie);

// Delete a movie
router.delete('/:_id', deleteMovie);

// Update multiple movies
router.patch('/', updateMultipleMovies);

// Delete multiple movies
router.delete('/', deleteMultipleMovies);

module.exports = router;