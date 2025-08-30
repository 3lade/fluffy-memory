const InventoryManager = require('../InventoryManager');

let manager;

beforeEach(() => {
  manager = new InventoryManager();
});

test("inventoryManager_initializes_with_empty_inventory", () => {
  expect(manager.getInventory()).toEqual({});
});

test("addItem_adds_new_item_to_inventory_and_emits_event", () => {
  const spy = jest.spyOn(manager, 'emit');

  manager.addItem('Apple', 10);

  expect(manager.getInventory()).toEqual({ Apple: 10 });
  expect(spy).toHaveBeenCalledWith('itemAdded', 'Apple', 10);
});

test("addItem_increases_quantity_if_item_already_exists", () => {
  manager.addItem('Apple', 5);
  manager.addItem('Apple', 5);

  expect(manager.getInventory()).toEqual({ Apple: 10 });
});

test("removeItem_decreases_quantity_and_emits_itemRemoved", () => {
  const spy = jest.spyOn(manager, 'emit');

  manager.addItem('Apple', 10);
  manager.removeItem('Apple', 4);

  expect(manager.getInventory()).toEqual({ Apple: 6 });
  expect(spy).toHaveBeenCalledWith('itemRemoved', 'Apple', 4);
});

test("removeItem_to_zero_emits_itemOutOfStock", () => {
  const spy = jest.spyOn(manager, 'emit');

  manager.addItem('Apple', 5);
  manager.removeItem('Apple', 5);

  expect(manager.getInventory()).toEqual({ Apple: 0 });
  expect(spy).toHaveBeenCalledWith('itemRemoved', 'Apple', 5);
  expect(spy).toHaveBeenCalledWith('itemOutOfStock', 'Apple');
});
