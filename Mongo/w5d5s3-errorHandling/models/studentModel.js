const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    isEnrolled: {
        type: Boolean,
        default: true,
        required: true
    }
})

module.exports = mongoose.model('Student', schema)