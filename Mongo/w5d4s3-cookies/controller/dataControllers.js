function getCookies(req) {
    const cookie = req.cookies['favourite'];
    return cookie ? JSON.parse(cookie) : [];
}


//name exports instead of default exporting
module.exports.getFav = (req, res) => {
    const favorites = getCookies(req);
    return res.status(200).json({favorites, count: favorites.length});
}


//name exports instead of default exporting
module.exports.addfav = (req, res) => {
    const {item} = req.body;

    if(!item)
    {
        return res.status(400).json({error: "Item Invalid"});
    }

    const favorites = getCookies(req);
    
    if(!favorites.includes(item))
    {
        favorites.push(item);
        res.cookie('favourite', JSON.stringify(favorites), {
            maxAge: 24 * 60 * 60 *1000,
            httpOnly: true
        })

        return res.status(200).json({message: "Item added to favorites", favorites})
    }
    return res.status(200).json({message: "Item already in favorites"});
}

//name exports instead of default exporting
module.exports.deleteFav = (req, res) => {
    const {item} = req.body;
    if(!item)
    {
        return res.status(400).json({error: "Item Invalid"});
    }
    const favorites = getCookies(req);
    const foundId = favorites.findIndex((fav) => fav === item);

    if(foundId !== -1)
    {
        favorites.splice(foundId, 1);
        res.cookie('favourite', JSON.stringify(favorites), {
            maxAge: 24 * 60 *60 *1000,
            httpOnly: true
        })

        return res.status(200).json({message: "Item removed from favorites", favorites})
    }
    return res.status(400).json({error: "Item not found"});

}