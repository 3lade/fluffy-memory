const Vehicle = require('../models/vehicleModel');

const addVehicle = async (req, res) => {
    try {
        const newVehicle = await Vehicle.create(req.body);
        return res.status(200).json({message: "vehicle added successfully", newVehicle})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllVehicles = async (req, res) => {
    try {
        const {searchValue, sortValue} = req.query;

        const filter = {};

        if(searchValue)
        {
            filter.vehicleName = {$regex: searchValue, $options: 'i'}
        }

        let vehicles = Vehicle.find(filter)

        if(sortValue)
        {
            vehicles = vehicles.sort({ rentalPrice: sortValue === 'asc' ? 1 : -1})
        }

        const result = await vehicles;

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getVehicleByUserId = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({userId: req.params.userId}). sort({rentalPrice: 1})
        return res.status(200).json(vehicles)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = {
    addVehicle,
    getAllVehicles,
    getVehicleByUserId
}