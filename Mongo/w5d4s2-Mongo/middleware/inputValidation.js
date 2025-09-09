const validateBooks = (req, res, next) => {
    const {title, author, publishedYear} = req.body;

    if(!title || typeof title !== 'string' || !author || typeof author !== 'string' || !publishedYear)
    {
        return res.status(400).json({error: "Title, author, publishedYear and available should be valid."})
    }
    next()
}

module.exports = validateBooks;