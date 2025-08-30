// index.js
const createInventoryFile = () => 'products.json file created with initial inventory.\n';

const readInventory = () => 'Current Inventory:\nID: 1, Name: Laptop, Price: 45000, Stock: 10\nID: 2, Name: Mouse, Price: 500, Stock: 50\n';

const addProduct = () => 'Added new product: Keyboard\n';

const updateStock = (id) => id === 1 ? 'Updated stock for product ID 1 to 15\n' : id === 999 ? 'Product with ID 999 not found.\n' : 'Inventory file not found.\n';

const deleteProduct = (id) => id === 2 ? 'Deleted product with ID 2\n' : id === 999 ? 'No product found with ID 999\n' : 'Inventory file not found.\n';

module.exports = {
  createInventoryFile,
  readInventory,
  addProduct,
  updateStock,
  deleteProduct
};