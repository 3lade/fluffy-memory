const { MenuItem, Order } = require('../index'); // Load exported globals

describe('Menu Ordering System - Global Implementation', () => {
  // ✅ Global object checks
  test('global_MenuItem_class_should_be_defined', () => {
    expect(global.MenuItem).toBeDefined();
    expect(typeof global.MenuItem).toBe('function');
  });

  test('global_Order_class_should_be_defined', () => {
    expect(global.Order).toBeDefined();
    expect(typeof global.Order).toBe('function');
  });

  // ✅ Exported references check
  test('MenuItem_class_should_be_exported', () => {
    expect(MenuItem).toBeDefined();
  });

  test('Order_class_should_be_exported', () => {
    expect(Order).toBeDefined();
  });

  // ✅ MenuItem functionality test
  test('MenuItem_should_store_name_and_price_correctly', () => {
    const item = new MenuItem('Pizza', 250);
    expect(item.name).toBe('Pizza');
    expect(item.price).toBe(250);
  });

  // ✅ Order functionality tests
  test('Order_should_start_with_empty_items_array', () => {
    const order = new Order();
    expect(order.items).toEqual([]);
  });

  test('Order_addItem_should_add_menuItem_to_items', () => {
    const item = new MenuItem('Pasta', 180);
    const order = new Order();
    order.addItem(item);
    expect(order.items.length).toBe(1);
    expect(order.items[0]).toBe(item);
  });

  test('Order_calculateTotal_should_return_correct_sum', () => {
    const order = new Order();
    order.addItem(new MenuItem('Burger', 150));
    order.addItem(new MenuItem('Fries', 80));
    order.addItem(new MenuItem('Soda', 50));
    expect(order.calculateTotal()).toBe(280);
  });

  test('Order_printOrderDetails_should_log_correctly', () => {
    const order = new Order();
    order.addItem(new MenuItem('Burger', 150));
    order.addItem(new MenuItem('Fries', 80));

    // Spy on console.log
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    order.printOrderDetails();

    expect(logSpy).toHaveBeenCalledWith('--- Order Summary ---');
    expect(logSpy).toHaveBeenCalledWith('Burger: 150');
    expect(logSpy).toHaveBeenCalledWith('Fries: 80');
    expect(logSpy).toHaveBeenCalledWith('Total: 230');

    logSpy.mockRestore(); // Restore console.log
  });
});
