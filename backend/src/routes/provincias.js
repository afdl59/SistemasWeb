const express = require('express');
const router = express.Router();
const provinciasController = require('../controllers/provinciasController');

// Rutas de provincias
router.get('/', provinciasController.getAllProvincias);
router.get('/:id', provinciasController.getProvinciaById);

module.exports = router;
