const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [18, 'Age must be at least 18'],
        max: [40, 'Age must be at most 40']
    },
    team: {
        type: String,
        required: [true, 'Team is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
        enum: ['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']
    },
    runs: {
        type: Number,
        default: 0,
        min: [0, 'Runs cannot be negative']
    },
    wickets: {
        type: Number,
        default: 0,
        min: [0, 'Wickets cannot be negative']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    isCaptain: {
        type: Boolean,
        default: false,
        //using match instead of validate for boolean
        match: [/^(true|false)$/, 'isCaptain must be a boolean']
    }
});

module.exports = mongoose.model('Player', schema);