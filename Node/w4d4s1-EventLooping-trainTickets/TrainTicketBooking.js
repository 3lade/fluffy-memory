// let bookings=[];

// const { resolve } = require("karma/lib/plugin");

// const TrainTicketBooking = (booking) =>
// {
//     bookings.push(booking)
//     console.log(`Booking for ${booking.name} added.`);
// }

class TrainTicketBooking {
    constructor() {
        this.bookings = [];
    }

    async addBooking(booking) {
        return new Promise((resolve, reject) => {
            this.bookings.push(booking);
            setTimeout(() => {
                console.log(`Booking for ${booking.name} added.`);
                resolve();
            }, 1000);
        })
    }

    async getBooking(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const searchName = this.bookings.find(item => item.name === name)
                resolve(searchName);
                // return searchName;
            }, 1000);
        })
    }

    async listBookings() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.bookings);
                // return this.bookings;
            }, 1000);
        })
    }
}

module.exports = TrainTicketBooking;