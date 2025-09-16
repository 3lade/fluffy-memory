const express = require('express');
const session = require('express-session');
const router = require('./routers/authRouter');
const app = express();

const port = 8080;
app.use(express.json());


app.use(session({
    secret: 'superSecretKey@456',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60 * 60 * 1000}
}))

app.use('/', router);

    
app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})