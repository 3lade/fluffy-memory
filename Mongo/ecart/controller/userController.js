const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({message: "Successfully fetched all users", users})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const updatePassword = async (req, res) => {
    try {
        const {username} = req.params;
        const {password} = req.body;

        if(!username || !password) {
            return res.status(400).json({message: "Username and new Password are required"});
        }

        const user = await User.findOne({username})
        console.log(user)

        if(!user)
        {
            return res.status(404).json({message: "User with the provided username is not found"});
        }

        const newHashPassword = await bcrypt.hash(password, 10);
        user.password = newHashPassword;
        const updatedUser = await user.save(); 

        return res.status(200).json({message: "Password successfully Updated"});
        
    } catch (error) {
        return res.status(500).json({message: "Password updation failed"});
        
    }
}

module.exports = {
    getAllUsers,
    updatePassword
}