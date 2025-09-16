const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign(
        {_id:id},
        "poiuytrsw34567890plknbvcdsew4567890pokjbvcxdse456789o"
    )
}

const validateToken = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if(!token)
        {
            return res.status(400).json({message: "Authentication failed"})
        }
        const verified = jwt.verify(token, "poiuytrsw34567890plknbvcdsew4567890pokjbvcxdse456789o");
        req.user = verified;
        next()
        return res.status(200).json(token)
    } catch (error) {
        return res.status(500).json({message: "Authentication failed"})
    }
}

module.exports = {
    generateToken,
    validateToken
}