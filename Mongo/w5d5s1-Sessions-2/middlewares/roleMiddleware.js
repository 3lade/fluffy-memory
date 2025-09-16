const roleMiddleware = (role) => {
    // const role = req.session.user.role;
    // req.session.user
    return (req, res, next) => {
        if (req.session.user.role !== role) {
            return res.status(403).json({ message: "Access denied: insufficient role." });
        }
        next();
    }

}

module.exports = roleMiddleware;