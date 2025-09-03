const express = require("express");
const app = express();

app.use(express.json());

const PORT = 8080;

const initialProducts = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 }
];

// GET all products
app.get('/products', (req, res) => {
    res.status(200).json(initialProducts);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = initialProducts.find(item => item.id === productId);

    if (!product) {
        return res.status(404).send("Product not found");
    }

    res.status(200).json(product);
});

// POST new product
app.post('/products', (req, res) => {
    const { name, price } = req.body;

    if (typeof name !== 'string' || !name || typeof price !== 'number' || price < 0) {
        return res.status(400).send("Name and price are required to add a product.");
    }

    const lastProduct = initialProducts[initialProducts.length - 1];
    const newId = initialProducts.length > 0 ? lastProduct.id + 1 : 1;
    const newItem = { id: newId, name, price };

    initialProducts.push(newItem);
    res.status(201).json(newItem);
});

// PUT – Replace entire product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const index = initialProducts.findIndex(p => p.id === productId);
    if (index === -1) {
        return res.status(404).send("Product not found");
    }

    if (typeof name !== 'string' || !name || typeof price !== 'number' || price < 0) {
        return res.status(400).send("Valid name and price are required");
    }

    initialProducts[index] = { id: productId, name, price };
    res.status(200).json(initialProducts[index]);
});

// PATCH – Update part of product
app.patch('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;

    const product = initialProducts.find(p => p.id === productId);
    if (!product) {
        return res.status(404).send("Product not found");
    }

    if (name !== undefined) {
        if (typeof name !== 'string' || !name) {
            return res.status(400).send("Invalid name");
        }
        product.name = name;
    }

    if (price !== undefined) {
        if (typeof price !== 'number' || price < 0) {
            return res.status(400).send("Invalid price");
        }
        product.price = price;
    }

    res.status(200).json(product);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const index = initialProducts.findIndex(p => p.id === productId);

    if (index === -1) {
        return res.status(404).send("Product not found");
    }

    const deletedProduct = initialProducts.splice(index, 1)[0];
    res.status(200).json(deletedProduct);
});

// Start server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});