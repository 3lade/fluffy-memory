const timestampMiddleware = (req, res, next) => {

    req.body.registeredAt = new Date().toISOString();

    next();
}

module.exports = {timestampMiddleware};