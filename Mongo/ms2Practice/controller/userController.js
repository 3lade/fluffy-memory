const { generateToken } = require('../authUtils');
const User = require('../models/userModel');

const addUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        return res.status(200).json({message: "user added succesfully", newUser})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getUserByUsernameAndPassword = async (req, res) => {
    try {
        const {email, password} =  req.body;
        const user = await User.findOne({email, password});
        if(!user)
        {
            return res.status(200).json({message: "Invalid Credentials"})
        }
        const token = generateToken(user._id);
        return res.status(200).json({token, user})
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
       const users = await User.find({});
       return res.status(200).json({users: users}) 
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = {
    addUser,
    getUserByUsernameAndPassword,
    getAllUsers
}