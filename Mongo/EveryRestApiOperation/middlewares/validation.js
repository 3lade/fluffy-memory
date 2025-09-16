const validation = (req, res, next) => {
    const {title, director, releaseYear, genre} = req.body;
    if(!title || typeof title !== 'string')
    {
        return res.status(400).json({error: "Movie validation failed: title: title is required"});
    }
    if(!director || typeof director !== 'string')
    {
        return res.status(400).json({error: "Movie validation failed: director: director is required"});
    }
    if(!releaseYear || typeof releaseYear !== 'number')
    {
        return res.status(400).json({error: "Movie validation failed: releaseYear: releaseYear is required"});
    }
    if(!genre || typeof genre !== 'string')
    {
        return res.status(400).json({error: "Movie validation failed: genre: genre is required"});
    }
    
    next();
}

module.exports = validation;