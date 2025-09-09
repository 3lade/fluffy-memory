// const errorHandler = (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal Server Error' });
// };

// module.exports = errorHandler;
const errorHandling = (err, req, res, next) => {
res.status(res.statusCode !== 200 ? res.statusCode : 500 ).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
})
}

module.exports = errorHandling;