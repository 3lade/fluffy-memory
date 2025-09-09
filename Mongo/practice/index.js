const express = require('express');
const mongoose = require('mongoose');
const routes = require('./router/playerRoutes');
const errorHandling = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());

const port = 3000;

// Routes should come before error handling
app.use('/', routes);

// Error handling middleware must be last
app.use(errorHandling);

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});