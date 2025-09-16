const express = require('express');
// const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routers/studentRoutes');
require('dotenv').config({path: '.env.local'});
const app = express();
const PORT1 = process.env.PORT1 || 5000;

app.use(express.json());


mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/students', routes);
app.use(errorHandler);

app.listen(PORT1, () => {
    console.log(`Listening to port: ${PORT1}`);
})
