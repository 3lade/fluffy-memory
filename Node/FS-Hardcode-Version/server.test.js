const fs = require('fs');
const path = require('path');
const {
  createInventoryFile,
  readInventory,
  addProduct,
  updateStock,
  deleteProduct
} = require('../index'); // Adjust path based on your folder structure

jest.mock('fs');

describe('ProductInventory_Functions', () => {
  const filePath = path.resolve('products.json');

  const initialProducts = [
    { id: 1, name: 'Laptop', price: 45000, stock: 10 },
    { id: 2, name: 'Mouse', price: 500, stock: 50 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Function definition checks
  test('ProductInventory_Should_Define_createInventoryFile_Function', () => {
    expect(createInventoryFile).toBeDefined();
  });

  test('ProductInventory_Should_Define_readInventory_Function', () => {
    expect(readInventory).toBeDefined();
  });

  test('ProductInventory_Should_Define_addProduct_Function', () => {
    expect(addProduct).toBeDefined();
  });

  test('ProductInventory_Should_Define_updateStock_Function', () => {
    expect(updateStock).toBeDefined();
  });

  test('ProductInventory_Should_Define_deleteProduct_Function', () => {
    expect(deleteProduct).toBeDefined();
  });

  // ✅ createInventoryFile
  test('createInventoryFile_Should_Create_File_With_Initial_Products', () => {
    const result = createInventoryFile();
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(initialProducts, null, 2)
    );
    expect(result).toBe('products.json file created with initial inventory.\n');
  });

  // ✅ readInventory
  test('readInventory_Should_Return_Inventory_When_File_Exists', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = readInventory();
    expect(result).toContain('Current Inventory:\n');
    expect(result).toContain('Laptop');
  });

  test('readInventory_Should_Return_Error_If_File_Not_Found', () => {
    fs.existsSync.mockReturnValue(false);
    const result = readInventory();
    expect(result).toBe('Inventory file not found.\n');
  });

  // ✅ addProduct
  test('addProduct_Should_Add_Product_And_Write_To_File', () => {
    const newProduct = { id: 3, name: 'Keyboard', price: 900, stock: 25 };
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = addProduct(newProduct);
    const expectedList = [...initialProducts, newProduct];

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(expectedList, null, 2)
    );
    expect(result).toBe('Added new product: Keyboard\n');
  });

  // ✅ updateStock
  test('updateStock_Should_Update_Stock_For_Valid_Product', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = updateStock(1, 15);
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(result).toBe('Updated stock for product ID 1 to 15\n');
  });

  test('updateStock_Should_Return_Not_Found_If_ID_Invalid', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = updateStock(999, 30);
    expect(result).toBe('Product with ID 999 not found.\n');
  });

  test('updateStock_Should_Handle_File_Not_Found', () => {
    fs.existsSync.mockReturnValue(false);
    const result = updateStock(1, 20);
    expect(result).toBe('Inventory file not found.\n');
  });

  // ✅ deleteProduct
  test('deleteProduct_Should_Delete_Product_When_Found', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = deleteProduct(2);
    const expectedList = initialProducts.filter(p => p.id !== 2);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      JSON.stringify(expectedList, null, 2)
    );
    expect(result).toBe('Deleted product with ID 2\n');
  });

  test('deleteProduct_Should_Return_Not_Found_If_ID_Not_Exists', () => {
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(JSON.stringify(initialProducts));

    const result = deleteProduct(999);
    expect(result).toBe('No product found with ID 999\n');
  });

  test('deleteProduct_Should_Handle_File_Not_Found', () => {
    fs.existsSync.mockReturnValue(false);
    const result = deleteProduct(1);
    expect(result).toBe('Inventory file not found.\n');
  });
});
