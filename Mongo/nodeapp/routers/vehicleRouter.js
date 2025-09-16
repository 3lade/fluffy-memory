const express = require('express');
const {
  getAllVehicles,
  getVehicleById,
  getVehicleByUserId,
  addVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController');
const { validateToken } = require('../authUtils');
const { vehicleValidator, updateVehicleValidator, inputValidator } = require('../validators/vehicleValidator');

const router = express.Router();

router.get('/getAllVehicles', validateToken, getAllVehicles);
router.get('/getVehicleById/:id', validateToken, getVehicleById);
router.get('/getVehicleByUserId/:userId', validateToken, getVehicleByUserId);
router.post('/addVehicle', validateToken, vehicleValidator(), inputValidator, addVehicle);
router.put('/updateVehicle/:id', validateToken, updateVehicleValidator(), inputValidator, updateVehicle);
router.delete('/deleteVehicle/:id', validateToken, deleteVehicle);

module.exports = router;
