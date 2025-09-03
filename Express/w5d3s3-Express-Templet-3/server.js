const express = require('express');
const app = express();
const port = 8080;
app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('product.ejs', {error: null, formData: {name: '', price: '', category: ''}});
})

app.post('/submit', (req, res) => {
    // console.log(req.body);
    const {name, price, category} = req.body;
    const formData = {name, price, category}

    if(!name || !price || !category)
    {
        return res.render('product.ejs', {
            error: "All fields are required.",
            formData
        })
    }

    if(isNaN(price) || Number(price) < 0)
    {
        return res.render('product.ejs', {
            error: "Price must be a number",
            formData
        })
    }
    res.send(`<h2>Product Added Successfully</h2>
              <p>Name: ${name}</p>
              <p>Price: ${price}</p>
              <p>Caregory: ${category}</p>
              <p<a href="/">Go Back</a>></p>
    `);
})

app.listen(port, () => {
 console.log(`App listening at ${port}`);
});