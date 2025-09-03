const express = require('express');
const { router } = require('./routes/webseriesRoutes');
const app = express();
const port = 8080;
app.use(express.json());

app.use('/api/webseries', router);

app.listen(port, () => {
 console.log(`App listening at ${port}`);
});