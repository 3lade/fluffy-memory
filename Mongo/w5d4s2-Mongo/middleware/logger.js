const logger = (req, res, next) => {
    console.log(`[Time: ${Date().toString}] ${req.method} ${req.url}`);
    next();
}

module.exports = logger;

