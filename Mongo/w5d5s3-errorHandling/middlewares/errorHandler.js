module.exports = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
        message: err.message,
        ...(process.env.NODE_ENV !== "production" && {stack: err.stack})
    });

}


// module.exports = (err, req, res, next) => {
// res.status(res.statusCode !== 200 ? res.statusCode : 500 ).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack
// })
// }