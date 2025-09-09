const Movie = require('../models/movieModel');

const getAllMovies = async (req, res) => {
    try {
        const mockMovies = await Movie.find({});
        return res.status(200).json(mockMovies)
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        return res.status(201).json(savedMovie)
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

const getMovieById = async (req, res) => {
    try {
        const mockMovie = await Movie.findById(req.params._id);
        if(!mockMovie)
        {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json(mockMovie)
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
}

//for updating all fields of a movie
const updateMovie = async (req, res) => {
    try {
        const updated = await Movie.findByIdAndUpdate(req.params._id, req.body, {new: true, runValidators: true});
        if(!updated)
        {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json(updated)
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params._id);
        if(!deleted)
        {
            return res.status(404).json({message: "Movie not found"});
        }
        return res.status(200).json({ message: 'Movie deleted successfully' })
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
}

//for updating multiple movies
// const updateMultipleMovies = async (req, res) => {
//     try {
//         const { filter, update } = req.body;
//         const result = await Movie.updateMany(filter, update, { new: true, runValidators: true });
//         return res.status(200).json({ message: `${result.nModified} movies updated successfully` });
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// }

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    updateMultipleMovies
}