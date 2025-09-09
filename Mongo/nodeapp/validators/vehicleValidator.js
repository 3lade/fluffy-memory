const { body, validationResult } = require('express-validator');

const vehicleValidator = () => {
    console.log('vehicle validator');
    return [
        body('vehicleName').isString().withMessage('Vehicle name must be string'),
        body('rentalPrice').isNumeric().withMessage('Rental price must be number'),
        body('description').isString().isLength({ max: 500 }).withMessage('Description must be string and max 500 characters'),
        body('imageUrl').isString().withMessage('Image URL must be string'),
        body('category').isString().withMessage('Category must be string'),
        body('origin').isString().withMessage('Origin must be string'),
        body('quantity').isNumeric().withMessage('Quantity must be number'),
        body('userId').isString().withMessage('User ID must be string')
    ];
};

const updateVehicleValidator = () => {
    console.log('update vehicle validator');
    return [
        body('vehicleName').optional().isString().withMessage('Vehicle name must be string'),
        body('rentalPrice').optional().isNumeric().withMessage('Rental price must be number'),
        body('description').optional().isString().isLength({ max: 500 }).withMessage('Description must be string and max 500 characters'),
        body('imageUrl').optional().isString().withMessage('Image URL must be string'),
        body('category').optional().isString().withMessage('Category must be string'),
        body('origin').optional().isString().withMessage('Origin must be string'),
        body('quantity').optional().isNumeric().withMessage('Quantity must be number'),
        body('userId').optional().isString().withMessage('User ID must be string')
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

module.exports = { vehicleValidator, updateVehicleValidator, inputValidator };
