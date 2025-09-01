// Write code here
// Utilize the ₹ symbol to indicate currency
const http = require("http");
const url = require("url");

const PORT = 8080;

let list = [
    { "name": "Milk", "price": "₹30" },
    { "name": "Bread", "price": "₹20" },
    { "name": "Butter", "price": "₹50" },
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    // Set response headers
    res.setHeader('Content-Type', 'text/plain');

    if (path === "/items") {
        if (list.length === 0) {
            res.statusCode = 200;
            res.end("Shopping list is empty.");
        } else {
            // Calculate total by extracting numeric values
            const total = list.reduce((acc, curr) => {
                const numeric = parseInt(curr.price.replace('₹', ''));
                return acc + numeric;
            }, 0);

            const itemList = list.map(item => `${item.name} - ${item.price}`);
            const msg = `Shopping List:\n${itemList.join('\n')}\nTotal: ₹${total}`;

            res.statusCode = 200;
            res.end(msg);
        }
    }
    else if (path === '/add') {
        const name = query.name;
        const price = query.price;

        if (name && price && !isNaN(price)) {
            // Add item to list with ₹ symbol
            list.push({ "name": name, "price": `₹${price}` });
            res.statusCode = 200;
            res.end(`Added item: ${name} - ₹${price}`);
        } else {
            res.statusCode = 400;
            res.end('Please provide valid name and price');
        }
    }
    else if (path === '/highest') {
        if (list.length === 0) {
            res.statusCode = 200;
            res.end("No items in the list.");
        } else {
            // Find highest priced item by comparing numeric values
            const highestItem = list.reduce((max, item) => {
                const currentPrice = parseInt(item.price.replace('₹', ''));
                const maxPrice = parseInt(max.price.replace('₹', ''));
                return currentPrice > maxPrice ? item : max;
            });

            res.statusCode = 200;
            res.end(`Highest Priced Item: ${highestItem.name} - ${highestItem.price}`);
        }
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Connected on: ${PORT}`);
});

module.exports = server;