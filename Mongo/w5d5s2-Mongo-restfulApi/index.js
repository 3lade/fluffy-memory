const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./routers/movieRoutes');
const port = 8080;
app.use(express.json());

app.use('/movies', router);

mongoose.connect('mongodb://127.0.0.1:27017/movieDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(() => {
    console.log('Connection Failed')
})


app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})