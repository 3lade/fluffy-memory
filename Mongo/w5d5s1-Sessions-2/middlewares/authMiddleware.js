const authMiddleware = (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).json({message: "Please log in to access this route."});
    }
    next();
}

module.exports = authMiddleware;