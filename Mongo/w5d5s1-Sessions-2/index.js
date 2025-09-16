const express = require('express');
const session = require('express-session');
const routes = require('./routers/shopRouter');
const app = express();

const port = 8080;

app.use(express.json());

app.use(session({
    secret: 'shopSecretKey@123',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
}))

app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})