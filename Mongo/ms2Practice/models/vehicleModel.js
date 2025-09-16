const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  rentalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    maxlength: 500
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);