const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routers/userRoutes');
const vehicleRoute = require('./routers/vehicleRoutes');

const app = express();
app.use(express.json());

const port = 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("Connected to mongoDB");
}).catch(()=> {
    console.log("Connection failed");
})

app.use('/api/user', userRoute)
app.use('/api/vehicle', vehicleRoute)

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})