const { playerValidation, playerUpdateValidation, validate } = require('../middlewares/validation.js');
const playerController = require('../controller/playerController');

const routes = require('express').Router();

//simply import them directly and use them in the routes
routes.get('/players', playerController.getAllPlayers);
routes.post('/players', playerValidation, validate, playerController.createPlayer);
routes.get('/players/:id', playerController.getPlayerById);
routes.get('/players/role/?role', playerController.getPlayersByRole);
routes.put('/players/:id', playerUpdateValidation, validate, playerController.updatePlayerById);
routes.delete('/players/:id', playerController.deletePlayerById);

module.exports = routes;