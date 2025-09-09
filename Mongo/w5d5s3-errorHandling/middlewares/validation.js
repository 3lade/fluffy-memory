const validation = (req, res, next) => {
    const {name, age, department} = req.body;
    if(name === '' || age === '' || department === '')
    {
        return res.status(400).json({message: 'Name, age, and department are required'});
    }
    next();
}

module.exports = validation;