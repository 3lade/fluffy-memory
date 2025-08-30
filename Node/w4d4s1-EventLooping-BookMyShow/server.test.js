const BookMyShow = require('../BookMyShow');

let bms;

beforeEach(() => {
  bms = new BookMyShow();
});

test("bookMyShow_initializes_with_empty_shows_and_bookings", () => {
  expect(bms.shows).toEqual([]);
  expect(bms.bookings).toEqual([]);
});

test("addShow_adds_show_and_logs_message", async () => {
  console.log = jest.fn();
  const show = { title: 'Movie A', type: 'Movie', price: 10 };

  await bms.addShow(show);

  expect(bms.shows.length).toBe(1);
  expect(console.log).toHaveBeenCalledWith("Show for Movie A added.");
});

test("listShows_returns_all_shows", async () => {
  await bms.addShow({ title: 'Movie A', type: 'Movie', price: 10 });
  await bms.addShow({ title: 'Concert B', type: 'Event', price: 50 });

  const shows = await bms.listShows();

  expect(shows).toEqual([
    { title: 'Movie A', type: 'Movie', price: 10 },
    { title: 'Concert B', type: 'Event', price: 50 }
  ]);
});

test("bookShow_adds_booking_and_logs_message", async () => {
  console.log = jest.fn();
  const booking = { title: 'Movie A', customer: 'John Doe', quantity: 2 };

  await bms.bookShow(booking);

  expect(bms.bookings.length).toBe(1);
  expect(console.log).toHaveBeenCalledWith("Booking for Movie A by John Doe added.");
});

test("listBookings_returns_all_bookings", async () => {
  await bms.bookShow({ title: 'Movie A', customer: 'John Doe', quantity: 2 });

  const bookings = await bms.listBookings();

  expect(bookings).toEqual([
    { title: 'Movie A', customer: 'John Doe', quantity: 2 }
  ]);
});
