const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        minlength: 2,
        maxlength: 25
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        match:[/^[^\s@]+@[^\s@]+[^\s@]+$/, 'Please fill in a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/],
        minlength: 8
    }
})

module.exports = mongoose.model('User', userSchema);