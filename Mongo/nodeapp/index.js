const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const vehicleRouter = require('./routers/vehicleRouter');

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/vehicledatabase')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Root route - ADD THIS
app.get('/', (req, res) => {
  res.json({ 
    message: 'AutoRentalHub API is running!', 
    endpoints: {
      users: '/user/*',
      vehicles: '/vehicle/*'
    }
  });
});

// Routes
app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});