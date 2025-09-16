const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routers/authRoutes');
const userRoutes = require('./routers/userRoutes');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routers/productRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT1 || 5000

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/shoppingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to mongo")
}).catch(() => {
    console.log("Connection failed")
})

    
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes)


app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
})