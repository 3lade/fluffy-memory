const { body, validationResult } = require('express-validator');

//make them in a single line

const playerValidation = [
    body('name').notEmpty().withMessage('Name is required').trim(),

    body('age').isInt({ min: 18, max: 40 }).withMessage('Age must be a number between 18 and 40'),

    body('team').notEmpty().withMessage('Team is required').trim(),

    body('role').isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']).withMessage('Role must be one of: Batsman, Bowler, All-Rounder, Wicket-Keeper'),
    
    body('runs').optional().isInt({ min: 0 }).withMessage('Runs must be a non-negative number'),

    body('wickets').optional().isInt({ min: 0 }).withMessage('Wickets must be a non-negative number'),

    body('price').isNumeric().custom(value => value >= 0).withMessage('Price must be a non-negative number'),

    body('isCaptain').optional().isBoolean().withMessage('isCaptain must be a boolean'),

    param('id').isMongoId().withMessage('Invalid player ID'),

    query('role').optional().isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']).withMessage('Role filter must be one of: Batsman, Bowler, All-Rounder, Wicket-Keeper'),

    query('team').optional().notEmpty().withMessage('Team filter cannot be empty').trim(),
];

const playerUpdateValidation = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty').trim(),

    body('age').optional().isInt({ min: 18, max: 40 }).withMessage('Age must be a number between 18 and 40'),

    body('team').optional().notEmpty().withMessage('Team cannot be empty').trim(),

    body('role').optional().isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']).withMessage('Role must be one of: Batsman, Bowler, All-Rounder, Wicket-Keeper'),

    body('runs').optional().isInt({ min: 0 }).withMessage('Runs must be a non-negative number'),

    body('wickets').optional().isInt({ min: 0 }).withMessage('Wickets must be a non-negative number'),

    body('price').optional().isNumeric().custom(value => value >= 0).withMessage('Price must be a non-negative number'),

    body('isCaptain').optional().isBoolean().withMessage('isCaptain must be a boolean'),

    param('id').isMongoId().withMessage('Invalid player ID'),

    query('role').optional().isIn(['Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper']).withMessage('Role filter must be one of: Batsman, Bowler, All-Rounder, Wicket-Keeper'),

    query('team').optional().notEmpty().withMessage('Team filter cannot be empty').trim(),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array().map(err => ({ 
                field: err.path || err.param, 
                message: err.msg 
            })) 
        });
    }
    next();
};

module.exports = {
    playerValidation,
    playerUpdateValidation,
    validate
};