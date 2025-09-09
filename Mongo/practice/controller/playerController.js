const Player = require('../model/playerModel');
// Get all players
const  getAllPlayers = async (req, res, next) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
};
// Create a new player
const createPlayer = async (req, res, next) => {
    try {
        const player = await Player.create(req.body);
        res.status(201).json(player);
    } catch (error) {
        next(error);
    }
};

//get player by id
const getPlayerById = async (req, res, next) => {
    try {
        const player = await Player.findById(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
}

//get player by role
//use query instead of params for role
const getPlayersByRole = async (req, res, next) => {
    try {
        const players = await Player.find({ role: req.query.role });
        if (!players || players.length === 0) {
            return res.status(404).json({ message: 'No players found for this role' });
        }
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
}

//update player by id
const updatePlayerById = async (req, res, next) => {
    try {
        const player = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
}

//delete player by id
const deletePlayerById = async (req, res, next) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).json({ message: 'Player not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPlayers,
    createPlayer,
    getPlayerById,
    getPlayersByRole,
    updatePlayerById,
    deletePlayerById
}