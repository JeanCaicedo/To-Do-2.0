// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

// registrar usuario
router.post('/register', authController.register);

// iniciar sesión
router.post('/login', authController.login);

// cerrar sesión
router.post('/logout', auth, authController.logout);

// cambiar contraseña
router.put('/change-password', auth, authController.changePassword);

module.exports = router;
