const BookMyShow = require("./BookMyShow");

const book = new BookMyShow();

book.addShow({ title: 'Movie A', type: 'Movie', price: 10});
book.addShow({ title: 'Concert B', type: 'Event', price: 50});