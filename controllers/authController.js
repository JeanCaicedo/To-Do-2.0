const authService = require('../services/authService');
const InvalidToken = require('../models/invalidToken');

const logout = async (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const invalidToken = new InvalidToken({ token });
  await invalidToken.save();
  res.status(200).json({ message: 'Logged out successfully' });
};

const register = async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { user,body } = req;
    const { oldPassword, newPassword } = body;
    await authService.changePassword(user._id, oldPassword, newPassword);
    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
};
