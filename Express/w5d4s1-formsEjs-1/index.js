const express = require('express');
const app = express();
const port = 8080;

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.status(200).render('form');
})

app.post('/submit', (req, res) => {
    const {name, message} = req.body;
    if(!name || !message)
    {
        return res.status(400).send("Invalid Input");
    }
    res.status(200).render('success', {name, message});
})

app.listen(port, () => {
 console.log(`App listening at ${port}`);
});