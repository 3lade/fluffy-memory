const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routers/movieRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const port = 8080;

// Middleware
app.use(express.json());

// Routes
app.use('/movies', router);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Movie API Server is running!' });
});

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/movieDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Connection Failed:', err.message);
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
});