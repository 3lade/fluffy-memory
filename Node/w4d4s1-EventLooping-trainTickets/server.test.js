const TrainTicketBooking = require('../TrainTicketBooking');

let bookingSystem;

beforeEach(() => {
  bookingSystem = new TrainTicketBooking();
});

test("bookingSystem_initializes_with_empty_booking_list", () => {
  expect(bookingSystem.bookings).toEqual([]);
});

test("addBooking_adds_booking_and_logs_message", async () => {
  console.log = jest.fn();
  const booking = { name: 'Alice', destination: 'Paris', date: '2024-06-15' };

  await bookingSystem.addBooking(booking);

  expect(bookingSystem.bookings.length).toBe(1);
  expect(console.log).toHaveBeenCalledWith("Booking for Alice added.");
});

test("getBooking_returns_correct_booking_by_name", async () => {
  await bookingSystem.addBooking({ name: 'Bob', destination: 'Berlin', date: '2024-06-16' });

  const result = await bookingSystem.getBooking('Bob');

  expect(result).toEqual({ name: 'Bob', destination: 'Berlin', date: '2024-06-16' });
});

test("getBooking_returns_undefined_for_nonexistent_name", async () => {
  const result = await bookingSystem.getBooking('Charlie');
  expect(result).toBeUndefined();
});

test("listBookings_returns_all_bookings_after_adding", async () => {
  await bookingSystem.addBooking({ name: 'Alice', destination: 'Paris', date: '2024-06-15' });
  await bookingSystem.addBooking({ name: 'Bob', destination: 'Berlin', date: '2024-06-16' });

  const result = await bookingSystem.listBookings();

  expect(result).toEqual([
    { name: 'Alice', destination: 'Paris', date: '2024-06-15' },
    { name: 'Bob', destination: 'Berlin', date: '2024-06-16' }
  ]);
});
