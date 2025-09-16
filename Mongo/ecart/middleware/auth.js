const jwt = require('jsonwebtoken');

//SECRET_KEY=kjhgfer567kjhgfre456789ijhgfdswe456789ijhgfdrtyuiij

const authentication = (req, res, next) => {
    const token = req.cookies.token;                   //const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({message: "Token is missing or expired"})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(500).json({message: "Invalid token"})
    }
}

module.exports = authentication;