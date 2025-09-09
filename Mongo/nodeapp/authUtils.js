const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ _id: id }, 'secretkey');
};

const validateToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(400).json({ message: 'Authentication failed' });
    }
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Authentication failed' });
  }
};

module.exports = { generateToken, validateToken };
