const Movie = require('../models/movieModel');

// Get all movies with optional pagination and sorting
const getAllMovies = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'title' } = req.query;
        const skip = (page - 1) * limit;
        
        const movies = await Movie.find({})
            .sort({ [sort]: 1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Movie.countDocuments();
        
        return res.status(200).json({
            movies,
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalMovies: total
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        return res.status(201).json(savedMovie);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get movie by ID
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params._id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(movie);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

// Update a movie (full update with PUT or partial update with PATCH)
const updateMovie = async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(
            req.params._id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json(updated);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

// Delete a movie
const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params._id);
        if (!deleted) {
            return res.status(404).json({ message: "Movie not found" });
        }
        return res.status(200).json({ message: 'Movie deleted successfully' });
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

// Update multiple movies
const updateMultipleMovies = async (req, res) => {
    try {
        const { filter, update } = req.body;
        if (!filter || !update) {
            return res.status(400).json({ message: 'Filter and update fields are required' });
        }
        
        const result = await Movie.updateMany(filter, update, { runValidators: true });
        return res.status(200).json({ 
            message: `${result.modifiedCount} movies updated successfully`,
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Delete multiple movies
const deleteMultipleMovies = async (req, res) => {
    try {
        const { filter } = req.body;
        if (!filter) {
            return res.status(400).json({ message: 'Filter is required' });
        }
        
        const result = await Movie.deleteMany(filter);
        return res.status(200).json({ 
            message: `${result.deletedCount} movies deleted successfully`,
            deletedCount: result.deletedCount
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
    try {
        const { genre } = req.params;
        const movies = await Movie.find({ 
            genre: { $regex: new RegExp(genre, 'i') } 
        });
        
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this genre' });
        }
        
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Get movies by director
const getMoviesByDirector = async (req, res) => {
    try {
        const { director } = req.params;
        const movies = await Movie.find({ 
            director: { $regex: new RegExp(director, 'i') } 
        });
        
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this director' });
        }
        
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Search movies by title or director
const searchMovies = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        
        const movies = await Movie.find({
            $or: [
                { title: { $regex: new RegExp(q, 'i') } },
                { director: { $regex: new RegExp(q, 'i') } }
            ]
        });
        
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found matching your search' });
        }
        
        return res.status(200).json(movies);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
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
};