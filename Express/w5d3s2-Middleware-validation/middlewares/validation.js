const inputValidation = (req, res, next) => {
    const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const {name, email} = req.body;

    if(typeof name !== 'string')
    {
        return res.status(400).json({error: "name should be string"})
    }
    if(typeof email !== 'string')
    {
        return res.status(400).json({error: "email should be string"})
    }
    if(!emailRegEx.test(email))
    {
        return res.status(400).json({error: "emailnot valid"})

    }
    next();
}

module.exports = {inputValidation};