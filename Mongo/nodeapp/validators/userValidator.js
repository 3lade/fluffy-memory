const { body, validationResult } = require('express-validator');

const userValidator = () => {
    console.log('user validator');
    return [
        body('firstName').isString().withMessage('First name must be string'),
        body('lastName').isString().withMessage('Last name must be string'),
        body('mobileNumber').isLength({ min: 10, max: 10 }).withMessage('Mobile number must be 10 digits'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('role').isString().withMessage('Role must be string'),
        body('password').isLength({ min: 6, max: 255 }).withMessage('Password must be between 6-255 characters')
    ];
};

const loginValidator = () => {
    console.log('login validator');
    return [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').isString().withMessage('Password must be string')
    ];
};

const inputValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const simple = errors.array().map(err => ({
            [err.path]: err.msg
        }));
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

module.exports = { userValidator, loginValidator, inputValidator };
