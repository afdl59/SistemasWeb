const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login
router.post('/login', authController.login);

// Cambiar contraseña desde temporal
router.post('/change-password', authController.changePassword);

module.exports = router;
