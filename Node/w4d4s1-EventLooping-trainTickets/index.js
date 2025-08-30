const TrainTicketBooking = require("./TrainTicketBooking");

const trainBooking = new TrainTicketBooking();

trainBooking.addBooking({ name: 'Alice', destination: 'Paris', date: '2024-06-15'})
trainBooking.addBooking({ name: 'Bob', destination: 'Berlin', date: '2024-06-16'})

// setTimeout(() => {
//     trainBooking.listBookings();
// }, 1000);