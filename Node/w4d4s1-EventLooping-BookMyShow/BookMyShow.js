// const { resolve } = require("karma/lib/plugin");

class BookMyShow {
    constructor()
    {
        this.shows=[];
        this.bookings=[];
    }

    async addShow(show)
    {
        return new Promise((resolve, reject) => {
            this.shows.push(show);
            setTimeout(() => {
                console.log(`Show for ${show.title} added.`);
                resolve();
            }, 1000);
        })
    }

    async listShows()
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.shows)
            }, 1000);
        })
    }

    async bookShow(booking)
    {
        return new Promise((resolve, reject) => {
            this.bookings.push(booking);
            setTimeout(() => {
                console.log(`Booking for ${booking.title} by ${booking.customer} added.`);
                resolve();
            }, 1000);
        })
    }

    async listBookings()
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.bookings);
            }, 1000);
        })
    }
}

module.exports = BookMyShow;
