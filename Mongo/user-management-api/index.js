const express = require('express');
const mongoose = require('mongoose');
// const router = require('./routers/userRouter');
require('dotenv').config();
const authRoutes = require('./routers/authRoutes');
const userCrudRoutes = require('./routers/userCrudRoutes');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser())


mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("MongoDB nor Connected");
});

// app.use('/', router);
app.use('/api/auth', authRoutes);
app.use('/api/user', userCrudRoutes);




const PORT = process.env.PORT1 || 5000;

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}...`);
})
