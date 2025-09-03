const express = require('express');
// const { routes } = require('../appdb/routes/dataRoutes');
const app = express();
const port = 8080;
app.use(express.json())

app.get('/api/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    if(isNaN(num1) ||isNaN(num2))
    {
        return res.status(400).send({error: "Both num1 and num2 must be numbers"});
    }
    let sum = 0;
    sum = num1 + num2;
    res.status(200).json({result: sum});    
})

app.get('/api/multiply', (req, res) => {
    // const {num1, num2} = req.query;
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if(isNaN(num1)||isNaN(num2))
    {
        return res.status(400).send({error: "Both num1 and num2 must be numbers"});
    }
    let multiply = 0;
    multiply = num1 * num2;
    res.status(200).json({result: multiply});    
})



app.listen(port, () => {
 console.log(`App listening at ${port}`);
});