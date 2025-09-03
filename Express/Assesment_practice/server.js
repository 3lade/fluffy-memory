const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8080;

const initialLaptops = [
    { 
        id: "2d80d73c-7b07-4927-a89b-23e758d3b540", 
        brand: "HP", 
        model: "AXY", 
        processor: "Intel", 
        ram: "16GB", 
        storage: "228GB", 
        price: 50000, 
        availability: true 
    },
    { 
        id: "d519f7f0-cd34-4e87-9118-80d16f6ba364", 
        brand: "HP", 
        model: "AXY", 
        processor: "Intel", 
        ram: "16GB", 
        storage: "228GB", 
        price: 50000, 
        availability: true 
    }
];

// GET all laptops
app.get('/api/laptops', (req, res) => {
    res.status(200).json(initialLaptops);
});

// GET laptop by ID
app.get('/api/laptops/:id', (req, res) => {
    const laptopId = req.params.id;
    const laptop = initialLaptops.find(item => item.id === laptopId);
    
    if (!laptop) {
        return res.status(404).send("Laptop not found");
    }
    
    res.status(200).json(laptop);
});

// POST new laptop
app.post('/api/laptops', (req, res) => {
    const { brand, model, processor, ram, storage, price, availability } = req.body;
    
    if (typeof brand !== 'string' || !brand || 
        typeof model !== 'string' || !model ||
        typeof processor !== 'string' || !processor ||
        typeof ram !== 'string' || !ram ||
        typeof storage !== 'string' || !storage ||
        typeof price !== 'number' || price < 0 ||
        typeof availability !== 'boolean') {
        return res.status(400).send("All fields (brand, model, processor, ram, storage, price, availability) are required with valid types.");
    }
    
    // Generate a simple UUID-like ID
    
    const newId = require('crypto').randomUUID();
    //const newId = initialLaptops + 1;
    //const newId = initialProducts.length > 0 ? lastProduct.id + 1 : 1;
    
    const newLaptop = { 
        id: newId, 
        brand, 
        model, 
        processor, 
        ram, 
        storage, 
        price, 
        availability 
    };
    
    initialLaptops.push(newLaptop);
    res.status(201).json({ id: newId });
});

// PUT – Replace entire laptop
app.put('/api/laptops/:id', (req, res) => {
    const laptopId = req.params.id;
    const { brand, model, processor, ram, storage, price, availability } = req.body;
    
    const index = initialLaptops.findIndex(p => p.id === laptopId);
    if (index === -1) {
        return res.status(404).send("Laptop not found");
    }
    
    if (typeof brand !== 'string' || !brand || 
        typeof model !== 'string' || !model ||
        typeof processor !== 'string' || !processor ||
        typeof ram !== 'string' || !ram ||
        typeof storage !== 'string' || !storage ||
        typeof price !== 'number' || price < 0 ||
        typeof availability !== 'boolean') {
        return res.status(400).send("Valid brand, model, processor, ram, storage, price, and availability are required");
    }
    
    initialLaptops[index] = { 
        id: laptopId, 
        brand, 
        model, 
        processor, 
        ram, 
        storage, 
        price, 
        availability 
    };
    res.status(200).json(initialLaptops[index]);
});

// PATCH – Update part of laptop
app.patch('/api/laptops/:id', (req, res) => {
    const laptopId = req.params.id;
    const { brand, model, processor, ram, storage, price, availability } = req.body;
    
    const laptop = initialLaptops.find(p => p.id === laptopId);
    if (!laptop) {
        return res.status(404).send("Laptop not found");
    }
    
    if (brand !== undefined) {
        if (typeof brand !== 'string' || !brand) {
            return res.status(400).send("Invalid brand");
        }
        laptop.brand = brand;
    }
    
    if (model !== undefined) {
        if (typeof model !== 'string' || !model) {
            return res.status(400).send("Invalid model");
        }
        laptop.model = model;
    }
    
    if (processor !== undefined) {
        if (typeof processor !== 'string' || !processor) {
            return res.status(400).send("Invalid processor");
        }
        laptop.processor = processor;
    }
    
    if (ram !== undefined) {
        if (typeof ram !== 'string' || !ram) {
            return res.status(400).send("Invalid ram");
        }
        laptop.ram = ram;
    }
    
    if (storage !== undefined) {
        if (typeof storage !== 'string' || !storage) {
            return res.status(400).send("Invalid storage");
        }
        laptop.storage = storage;
    }
    
    if (price !== undefined) {
        if (typeof price !== 'number' || price < 0) {
            return res.status(400).send("Invalid price");
        }
        laptop.price = price;
    }
    
    if (availability !== undefined) {
        if (typeof availability !== 'boolean') {
            return res.status(400).send("Invalid availability");
        }
        laptop.availability = availability;
    }
    
    res.status(200).json(laptop);
});

// DELETE laptop
app.delete('/api/laptops/:id', (req, res) => {
    const laptopId = req.params.id;
    const index = initialLaptops.findIndex(p => p.id === laptopId);
    
    if (index === -1) {
        return res.status(404).send("Laptop not found");
    }
    
    const deletedLaptop = initialLaptops.splice(index, 1)[0];
    res.status(200).json(deletedLaptop);
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});