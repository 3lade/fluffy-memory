const OrderProcessor = require('../OrderProcessor');

let processor;

beforeEach(() => {
  processor = new OrderProcessor();
});

test("orderProcessor_initializes_with_empty_orders", () => {
  expect(processor.orders).toEqual([]);
});

test("placeOrder_adds_order_with_status_placed_and_emits_event", () => {
  const spy = jest.spyOn(processor, 'emit');

  processor.placeOrder(1);

  expect(processor.orders.length).toBe(1);
  expect(processor.orders[0]).toEqual({ id: 1, status: 'placed' });
  expect(spy).toHaveBeenCalledWith('orderPlaced', 1);
});

test("shipOrder_updates_status_to_shipped_and_emits_event", () => {
  const spy = jest.spyOn(processor, 'emit');

  processor.placeOrder(1);
  processor.shipOrder(1);

  expect(processor.orders[0].status).toBe('shipped');
  expect(spy).toHaveBeenCalledWith('orderShipped', 1);
});

test("deliverOrder_updates_status_to_delivered_and_emits_event", () => {
  const spy = jest.spyOn(processor, 'emit');

  processor.placeOrder(1);
  processor.shipOrder(1);
  processor.deliverOrder(1);

  expect(processor.orders[0].status).toBe('delivered');
  expect(spy).toHaveBeenCalledWith('orderDelivered', 1);
});

test("shipOrder_and_deliverOrder_do_nothing_if_order_not_found", () => {
  const spy = jest.spyOn(processor, 'emit');

  processor.shipOrder(999);    // non-existent order
  processor.deliverOrder(999); // non-existent order

  expect(spy).not.toHaveBeenCalledWith('orderShipped', 999);
  expect(spy).not.toHaveBeenCalledWith('orderDelivered', 999);
});
