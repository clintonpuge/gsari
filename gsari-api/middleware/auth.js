const jwt = require('jsonwebtoken');
const config = require('config');

exports.checkAuth = (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(401).json({ message: 'Token is required.' });
    const decoded = jwt.decode(token, config.get('jwtKey'));
    res.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
