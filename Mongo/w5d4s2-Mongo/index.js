const express = require('express');

const mongoose = require('mongoose');
const logger = require('./middleware/logger');
const routes = require('./routes/booksRoutes');
const app = express();
const port = 8080;

app.use(express.json());
app.use(logger)

app.use('/books', routes)

mongoose.connect('mongodb://localhost:27017/bookapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(('Connected to MongoDB'))
}).catch((error) => {
    console.error('MongoDB not Connected: ', error);
}) 

app.listen(port, () => {
 console.log(`App listening at ${port}`);
});