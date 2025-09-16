const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, role, password } = req.body;
    try {
        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        const hashedPass = await bcrypt.hash(password, 10); //10 is the saltRounds, more saltround => more security but more slower.

        const user = new User({ username, password: hashedPass, role });
        const savedUser = await user.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        // if(Object.keys(error))
        if(error.name === 'validationError'){
            console.log(error.name);
            const errors = {}
            Object.keys(error.errors).forEach(field=>{
                errors[field] = error.errors[field].message;
            })
            return res.status(400).json({
                message: 'Validation field',
                errors:errors
            })
        }

        // console.log(error.errors.username.properties.message);
        res.status(500).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User Doesn't Exists" });
        }

        const passMatch = await bcrypt.compare(password, user.password);

        if (!passMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        )
        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: true
        })

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
