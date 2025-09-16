const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, { message: props => `${props.value} is not a valid mobile number!` }]
    // validate: {
    //   validator: function(v) {
    //     return /^\d{10}$/.test(v);
    //   },
    //   message: props => `${props.value} is not a valid mobile number!`
    // }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //use match
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
    message: props => `${props.value} is not a valid email address!`
  },
  role: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255
  }
});

module.exports = mongoose.model('User', userSchema);