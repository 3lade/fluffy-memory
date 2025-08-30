const fs = require("fs");
const path = require("path");
const filePath = path.resolve('products.json');

const initialProducts = [
    { id: 1, name: "Laptop", price: 45000, stock: 10},
    { id: 2, name: "Mouse", price: 500, stock: 50}
];

function createInventoryFile()
{
    const data = JSON.stringify(initialProducts, null, 2);
    fs.writeFileSync(filePath, data);
    const successMsg = 'products.json file created with initial inventory.\n';
    process.stdout.write(successMsg);
    return successMsg;
}

function readInventory()
{
    if(!fs.existsSync(filePath))
    {
        return 'Inventory file not found.\n'
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);
    const formattedData = JSON.stringify(parsedData, null, 2);
    const successMsg = `Current Inventory:\n${formattedData}\n`;
    process.stdout.write(successMsg);
    return successMsg;

    // return `Current Inventory: ${formattedData}\n`;
}

function addProduct(newProduct)
{
    if(!fs.existsSync(filePath))
    {
        return 'Inventory file not found.\n'
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(data);
    products.push(newProduct);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return `Added new product: ${newProduct.name}\n`
}

function updateStock (productId, newStock){
    if(!fs.existsSync(filePath))
    {
        return 'Inventory file not found.\n'
    }
    const data = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(data);
    
    const productIndex = products.findIndex(product => product.id === productId);
    if(productIndex === -1)
    {
        return `Product with ID ${productId} not found.\n`;
    }

    products[productIndex].stock = newStock;
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return `Updated stock for product ID ${productId} to ${newStock}\n`
}

function deleteProduct (productId){
    if(!fs.existsSync(filePath))
    {
        return 'Inventory file not found.\n'
    }

    const data = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(data);

    const initLen = products.length;
    const filteredProducts = products.filter(product => product.id !== productId);

    if(filteredProducts.length === initLen)
    {
        return `No product found with ID ${productId}\n`;
    }
    fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));
    return `Deleted product with ID ${productId}\n`
}

module.exports={
    createInventoryFile,
    readInventory,
    addProduct,
    updateStock,
    deleteProduct
}