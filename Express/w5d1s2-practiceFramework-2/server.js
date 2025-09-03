const Express = require("express");

const app = Express();

app.use(Express.json());

const PORT = 8080;



const inventory = [
    {
        "id": 1,
        "name": "Bandages",
        "Quantity": 100
    },
    {
        "id": 2,
        "name": "Antiseptic Wipes",
        "Quantity": 50
    },
    {
        "id": 3,
        "name": "Pain Relievers",
        "Quantity": 75
    }
]

app.get('/items', (req, res) => {
    return res.status(200).send(inventory);
})

app.post('/add', (req, res) => {

    const { name, quantity } = req.body;

    if ((typeof name !== 'string' || !name) || (typeof quantity !== "number" || quantity < 0)) {
        return res.status(400).send('Invalid input. Please provide a valid name and quantity (number >= 0).')
    }

    const newId = inventory.length > 0 ? inventory[inventory.length - 1].id + 1 : 1;

    const newItem = { id: newId, name: name, quantity: quantity };
    //or{id: newId, name, quantity};
    inventory.push(newItem);

    return res.status(201).send(newItem);

})

app.put('/update/:id', (req, res) => {
    // console.log(req.params); //use :
    // console.log(req.query); //use ?

    const id = parseInt(req.params.id);

    if (typeof id !== 'number') {
        return res.status(400).send('Invalid Id.');
    }

    const foundId = inventory.find(item => item.id === id)
    {
        if (!foundId) {
            return res.status(404).send('Item not found.')
        }
    }

    const { name, quantity } = req.body;

    if (name !== undefined) {
        if (typeof name !== 'string' || !name) {
            return res.status(400).send('Invalid Name.')
        }
        foundId.name = name;
    }

    if (quantity !== undefined) {
        if (typeof quantity !== 'number' || quantity < 0) {
            return res.status(400).send('Invalid quantity. Quantity must be a number >= 0.')
        }
        foundId.quantity = quantity;
    }

    return res.status(200).send(foundId);
})

app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)
    {
        if (typeof id !== 'number') {
            return res.status(400).send('Invalid Id.');
        }

        const itemIndex = inventory.findIndex(item => item.id === id);

        if(itemIndex === -1)
        {
            return res.status(404).send('Item not found');
        }

        const deleteItem = inventory.splice(itemIndex, 1);

        return res.status(200).send({message: `item with id ${id} deleted.`,deleteItem});
    }
})

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
})