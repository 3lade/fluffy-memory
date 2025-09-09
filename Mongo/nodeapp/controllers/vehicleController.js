const Vehicle = require('../models/vehicleModel');

const getAllVehicles = async (req, res) => {
  try {
    const { searchValue, sortValue } = req.query;
    let query = {};
    
    if (searchValue) {
      query.vehicleName = { $regex: searchValue, $options: 'i' };
    }
    
    let vehicles = Vehicle.find(query);
    
    if (sortValue) {
      vehicles = vehicles.sort({ rentalPrice: sortValue === 'asc' ? 1 : -1 });
    }
    
    const result = await vehicles;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) {
      return res.status(200).json({ message: 'Cannot find any vehicle' });
    }
    
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVehicleByUserId = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.params.userId }).sort({ rentalPrice: 1 });
    
    if (vehicles.length === 0) {
      return res.status(200).json({ message: 'Cannot find any vehicle' });
    }
    
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    
    if (!vehicle) {
      return res.status(200).json({ message: 'Cannot find any vehicle' });
    }
    
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  getVehicleByUserId,
  addVehicle,
  updateVehicle,
  deleteVehicle
};
