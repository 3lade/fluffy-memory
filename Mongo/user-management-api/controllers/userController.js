const User = require('../models/user');
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ message: "Successfully fetched users data", users });
    } catch (error) {
        res.status(500).json({ error: error.messsage });
    }

}

const getUserByName = async (req, res) => {
    try {
        const { username } = req.params;
        const dbUserObject = await User.findById(req.user.id).select('-password')
        if (dbUserObject.username !== username) {
            return res.status(401).json({ message: "You are not authorized to access this data!" })
        }

        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }
        if (!dbUserObject) {
            return res.status(404).json({ message: "User with the provided username not found" });
        }

        return res.status(200).json({ message: "User fetched successfully", dbUserObject });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { username } = req.params;

        const { role, password } = req.body;

        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        const user = await User.findOne({ username }).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User with the provided username not found" });
        }

        if (role && (role == 'Manager' || role == 'Employee')) {
            user.role = role;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await user.save();

        res.status(200).json({ message: "Updated user successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { username } = req.params;

        if (!username) {
            return res.status(400).json({ message: "Username is required." });
        }

        const user = await User.findOne({username}).select('-password');

        if (!user) {
            return res.status(404).json({ message: "User with the provided username not found" });
        }

        if (user.role == 'Manager') {
            return res.status(400).json({ message: "User with role as manager cannot be deleted" });
        }

        const deletedUser = await User.findByIdAndDelete({ username });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully", deletedUser });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { getAllUsers, getUserByName, updateUser, deleteUser };
