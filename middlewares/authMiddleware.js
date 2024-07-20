// middleware/auth.js
const jwt = require('jsonwebtoken');
const InvalidToken = require('../models/invalidToken');
const { findUserById } = require('../repositories/userRepository');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const invalidToken = await InvalidToken.findOne({ token });
    if (invalidToken) {
      throw new Error('Token is invalid');
    }

    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await findUserById(decoded.userId);
    
    if(!user) {
      throw new Error('User not found');
    }

    req.token = token;
    req.user = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
