const express = require('express');
const router = require('./routes/dataRoutes');
const app = express();
const port = 8080;
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

app.listen(port, () => {
 console.log(`App listening at ${port}`);
});