const fs = require('fs');
const path = require('path');
const { Writable } = require('stream');
const FoodDelivery = require('../FoodDelivery');

jest.mock('fs');

describe('FoodDelivery', () => {
  let delivery;

  beforeEach(() => {
    delivery = new FoodDelivery();
    jest.clearAllMocks();
  });

  test('addOrder_adds_order_to_list', () => {
    const order = { orderId: 1, customer: 'John', items: [] };
    delivery.addOrder(order);
    expect(delivery.orders.length).toBe(1);
    expect(delivery.orders[0]).toEqual(order);
  });

  test('calculateTotalCost_returns_correct_sum', () => {
    const order = {
      orderId: 1,
      items: [{ name: 'Burger', price: 5 }, { name: 'Fries', price: 3 }]
    };
    delivery.addOrder(order);
    const total = delivery.calculateTotalCost(1);
    expect(total).toBe(8);
  });

  test('calculateTotalCost_throws_error_for_invalid_orderId', () => {
    expect(() => delivery.calculateTotalCost(99)).toThrow('Order not found');
  });

  test('streamOrderDetails_writes_order_to_file', () => {
    const order = {
      orderId: 1,
      items: [{ name: 'Pizza', price: 10 }]
    };
    delivery.addOrder(order);
  
    const filePath = path.join(__dirname, 'mockOrder.json');
    const mockWriteStream = new Writable({
      write(chunk, encoding, callback) {
        callback(); // simulate async write completion
      }
    });

    const pipeSpy = jest.spyOn(mockWriteStream, 'write');
    fs.createWriteStream.mockReturnValue(mockWriteStream);
    expect(() => delivery.streamOrderDetails(1, filePath)).not.toThrow();
  });

  test('retrieveOrderDetails_reads_and_parses_file_correctly', done => {
    const fakeData = JSON.stringify({ orderId: 1, customer: 'Test' });
    const fakeStream = require('stream').Readable.from([fakeData]);

    fs.createReadStream.mockReturnValue(fakeStream);

    delivery.retrieveOrderDetails('mockFile.json', (err, data) => {
      expect(err).toBeNull();
      expect(data).toEqual({ orderId: 1, customer: 'Test' });
      done();
    });
  });

  test('clearOrders_empties_order_array', () => {
    delivery.addOrder({ orderId: 1, items: [] });
    delivery.clearOrders();
    expect(delivery.orders).toEqual([]);
  });
});
