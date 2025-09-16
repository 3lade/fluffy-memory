const login = (req, res) => {
    const {username, password} = req.body;
    console.log(req.body)
    if(username !== 'john' || password !== '1234')
    {
        return res.status(401).json({message: "Invalid credentials"});
    }
    req.session.user= "john";
    return res.status(200).json({message: "Login successful"});
}

const profile = (req, res) => {
    const name = req.session.user;
    if(name !== 'john' || !name)
    {
        return res.status(401).json({message: "Unauthorized. Please log in."})
    }
    return res.status(200).json({message: "Welcome to your profile, john!"})
}

module.exports = {
    login,
    profile
}
