const express = require('express');
const router = express.Router();
const verticalesController = require('../controllers/verticalesController');

// Rutas de verticales
router.get('/', verticalesController.getAllVerticales);
router.get('/:id', verticalesController.getVerticalById);
router.post('/', verticalesController.createVertical);
router.put('/:id', verticalesController.updateVertical);
router.delete('/:id', verticalesController.deleteVertical);

module.exports = router;
