const { body, validationResult } = require('express-validator');

const movieValidator = () => {
    console.log('movie validator');
    return [
        body('title').isString().withMessage('Title must be string'),
        body('director').isString().withMessage('Director must be string'),
        body('releaseYear').isInt({ min: 1800, max: new Date().getFullYear() + 5 }).withMessage('Release year must be a valid year'),
        body('genre').isString().withMessage('Genre must be string')
    ]
}

const inputValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const simple = errors.array().map(err => ({
            [err.path]: err.msg 
        }));
        return res.status(400).json({ 
            message: 'Validation failed',
            errors: simple
        });
    }
    next();
}

module.exports = { movieValidator, inputValidator };