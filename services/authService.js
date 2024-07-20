const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');
const { encryptPassword, decryptPassword } = require('../utils/password.util');

const registerUser = async (userData) => {
  const hashedPassword = await encryptPassword(userData.password);
  const userInstance = await userRepository.createUser({ ...userData, password: hashedPassword });
  const {
    password,
    ...dataNewUser
  
  } = userInstance.toObject();
  return dataNewUser;
};

const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('User not found');

  await decryptPassword(password, user.password);

  const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
  return { token };
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await userRepository.findUserById(userId);
  if (!user) throw new Error('User not found');
  await decryptPassword(oldPassword, user.password);
  const hashedPassword = await encryptPassword(newPassword);
  await userRepository.updateUser(userId, { password: hashedPassword });
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
