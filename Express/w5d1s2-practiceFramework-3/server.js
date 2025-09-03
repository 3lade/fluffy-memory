const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8080;

const Rooms = [
    { 
        "id": 1,
        "roomNumber": '101',
        "type": 'Single', 
        "isAvailable": true 
    },
    { 
        "id": 2,
        "roomNumber": '102',
        "type": 'Double', 
        "isAvailable": false 
    },
    { 
        "id": 3,
        "roomNumber": '103',
        "type": 'Suite', 
        "isAvailable": true 
    }
]

app.get('/', (req, res) => {
    return res.status(200).send("Welcome to the Hotel Room Management System!");
})

app.get('/rooms', (req, res) => {
    return res.status(200).send(Rooms);
})

app.get('/rooms/available', (req, res) => {
    const Available = Rooms.filter(room => room.isAvailable == true)
    console.log(Available);
    if(Available.length == 0)
    {
        // console.log(res.status);
        res.status(404)
        return res.send('No available rooms found.');
    }
    return res.status(200).send(Available);
})

app.post('/add', (req, res) => {
    const {roomNumber, type, isAvailable} = req.body;
    // const newId = req.params.id;

    if(typeof roomNumber !== 'string' || typeof type !== 'string' || typeof isAvailable !== 'boolean' || !roomNumber || !type || isAvailable === undefined || isAvailable === null)
    {
        return res.status(400).send("Invalid input")
    }

    const newId = Rooms.length > 0 ? Rooms[Rooms.length - 1].id + 1 : 1;
    const newRoom = { id: newId, roomNumber, type, isAvailable};
    Rooms.push(newRoom);
    res.status(201).send(newRoom);
})



app.listen(PORT, () => {
    console.log(`Connected to port: ${PORT}`);
})