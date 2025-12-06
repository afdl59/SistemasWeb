const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');

// Rutas de pedidos
router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidoById);
router.post('/', pedidosController.createPedido);
router.put('/:id', pedidosController.updatePedido);
router.delete('/:id', pedidosController.deletePedido);

module.exports = router;
