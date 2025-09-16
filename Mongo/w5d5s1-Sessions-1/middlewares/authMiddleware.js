const authMiddleware = (req, res, next) => {
    if(req.session.user !== 'john') {
        return res.status(401).json({message: 'Unauthorized. Please log in.'});
    }
    next();
}


module.exports = authMiddleware;