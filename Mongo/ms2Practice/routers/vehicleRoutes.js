const express = require('express');
const { addVehicle, getAllVehicles, getVehicleByUserId } = require('../controller/vehicleController');

const vehicleRoute = express.Router();

vehicleRoute.post('/', addVehicle)
vehicleRoute.get('/', getAllVehicles)
vehicleRoute.get('/:userId', getVehicleByUserId)

module.exports = vehicleRoute;