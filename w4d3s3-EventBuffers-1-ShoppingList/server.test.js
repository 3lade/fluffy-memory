const ShoppingList = require('../ShoppingList');

describe('ShoppingList', () => {
  let list;

  beforeEach(() => {
    list = new ShoppingList();
  });

  test('shoppingList_initializes_with_empty_list_and_zero_price', () => {
    expect(list.getItems()).toEqual([]);
    expect(list.getTotalPrice()).toBe(0);
  });

  test('addItem_adds_items_correctly', () => {
    list.addItem('Apples', 3.5);
    list.addItem('Bread', 2.0);
    const items = list.getItems();
    expect(items.length).toBe(2);
    expect(items[0]).toEqual({ itemName: 'Apples', price: 3.5 });
    expect(items[1]).toEqual({ itemName: 'Bread', price: 2.0 });
  });

  test('calculateTotalPrice_returns_correct_sum', () => {
    list.addItem('Apples', 3.5);
    list.addItem('Bread', 2.0);
    list.addItem('Milk', 4.25);
    list.calculateTotalPrice();
    expect(list.getTotalPrice()).toBeCloseTo(9.75);
  });

  test('removeItem_removes_specified_item', () => {
    list.addItem('Apples', 3.5);
    list.addItem('Bread', 2.0);
    list.removeItem('Bread');
    const items = list.getItems();
    expect(items.length).toBe(1);
    expect(items[0].itemName).toBe('Apples');
  });

  test('clearList_resets_list_and_total', () => {
    list.addItem('Milk', 4.25);
    list.calculateTotalPrice();
    list.clearList();
    expect(list.getItems()).toEqual([]);
    expect(list.getTotalPrice()).toBe(0);
  });

  test('calculateTotalPrice_updates_after_removal', () => {
    list.addItem('Apples', 3.5);
    list.addItem('Bread', 2.0);
    list.calculateTotalPrice();
    expect(list.getTotalPrice()).toBe(5.5);
    list.removeItem('Apples');
    list.calculateTotalPrice();
    expect(list.getTotalPrice()).toBe(2.0);
  });
});
