const validateToken = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token)
    {
        res.send("Invalid token")
    }

    try {
        const verified = await jwt.verify(token, process.env.SECRET_KEY);
        res.user = verified;
        next()
    } catch (error) {
        res.send("Not verified")
    }
}