const express = require("express");
const app = express();

app.use(express.json());
const PORT = 8080;

const workOuts = [
  
]

app.get('/workouts', (req, res) => {
    return res.status(200).json(workOuts);
})

app.post('/workouts', (req, res) => {
    const {type, duration, date} = req.body;
    if(typeof type !== 'string' || !type || typeof duration !== 'number' || duration < 0 || typeof date !== 'string' || !date)
    {
        return res.status(400).json("Invalid input")
    }
    const newId = workOuts.length + 1;
    const newWorkout = {
        id: newId,
        type,
        duration,
        date
    }
    workOuts.push(newWorkout);
    return res.status(201).json(newWorkout);
})

app.get('/summary', (req, res) => {
    // const minutes = parseInt(req.params.duration);
    const total = workOuts.reduce((acc, curr) => acc + curr.duration, 0);
    return res.status(200).json({"totalMinutes": total})
    
})

app.patch('/workouts', (req, res) => {
    return res.status(405).json("Method Not Allowed");
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
})