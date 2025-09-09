// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }
    
    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }
    
    // Duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate entry found'
        });
    }
    
    // Default error
    res.status(500).json({
        message: 'Internal Server Error'
    });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
    const error = new Error(`Route not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

module.exports = { errorHandler, notFound };