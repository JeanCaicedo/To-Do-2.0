const User = require('../models/user');

const findUserById = async (userId) => {
  return User.findById(userId).lean();
};

const findUserByEmail = async (email) => {
  return User.findOne({ email }).lean();
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateUser = async (userId, userData) => {
  return User.findByIdAndUpdate(userId, userData, { new: true });
}

// Otros métodos de acceso a datos para usuarios...

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUser,
};
