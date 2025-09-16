const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const userExist = await User.findOne({email})
        if(userExist)
        {
            return res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({username, email, password: hashedPassword})

        return res.status(200).json({message: "User registered successfully", user: user})

    } catch (error) {
        return res.status(500).json({message: "Registration failed"})
    }
}

const login = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const userExist = await User.findOne({email})
        if(!userExist)
        {
            return res.status(400).json({message: "User doesn't exist"})
        }

        const matchPassword = await bcrypt.compare(password, userExist.password)

        if(!matchPassword)
        {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const token = jwt.sign(
            {id: userExist.id},
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000

        })
        
        return res.status(200).json({message: "Logged in successfully", token})

    } catch (error) {
        return res.status(500).json({message : "Logging in failed"})
    }
}


module.exports = {
    register,
    login
}