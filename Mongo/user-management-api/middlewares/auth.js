const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Token is missing or invalid" });
    }
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid user" });
    }

}
    
module.exports = { authentication };
