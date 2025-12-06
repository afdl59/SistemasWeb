const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Obtener todos los usuarios
router.get('/', usersController.getAllUsers.bind(usersController));

// Exportar usuarios a JSON
router.get('/export/json', usersController.exportUsersJSON.bind(usersController));

// Crear nuevo usuario
router.post('/', usersController.createUser.bind(usersController));

// Actualizar usuario
router.put('/:id', usersController.updateUser.bind(usersController));

// Eliminar usuario
router.delete('/:id', usersController.deleteUser.bind(usersController));

// Alternar estado del usuario
router.post('/:id/toggle-status', usersController.toggleUserStatus.bind(usersController));

// Restablecer contraseña
router.post('/:id/reset-password', usersController.resetPassword.bind(usersController));

module.exports = router;
