const express = require('express');
// const { routes } = require('./routes/registerRoutes');
const app = express();
const port = 8080;

const registerRoutes = require('./routes/registerRoutes');
const logger= require('./middlewares/loggers');

app.use(express.json());

app.use(logger)
app.use('/api/registrations', registerRoutes)


app.listen(port, () => {
 console.log(`App listening at ${port}`);
});
