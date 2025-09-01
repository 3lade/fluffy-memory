const http = require("http");
const url = require('url')

const PORT = 8080;

let events = [];

function formatter() {
    return events.length === 0
    ? "No events found."
    : `Upcoming Events:\n${events.map((event, idx) => `${idx + 1}.${event.title} on ${event.date}`).join('\n')}`;
}

const server = http.createServer((req, res) => {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const query = parseUrl.query;
    console.log(path)

    if (path === "/") {
        res.write("Welcome to the Event Manager API!");
        return res.end();
    }

    if (path === "/events") {
        const msg = formatter();
        res.write(msg);
        // res.statusCode = 200;
        // res.write(JSON.stringify(events));
        return res.end();
    }

    if (path === "/create") {
        const {title, date} = query;

        if (!title || !date) {
            res.statusCode = 400;
            res.write("Missing title or date");
            return res.end();
        }
        console.log(events)

        events.push({title, date});
        res.write(`Event created: ${title} on ${date}`);
        return res.end();
    }

    if (path === "/reset") {
        events = [];
        res.write("All events have been cleared.");
        return res.end();
    }

})

server.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
})
