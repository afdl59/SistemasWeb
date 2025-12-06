const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// ============================================================
// RUTAS DE CLIENTES
// ============================================================

// Obtener todos los clientes
router.get('/', clientesController.getAllClientes);

// Obtener cliente por ID con todas sus relaciones
router.get('/:id', clientesController.getClienteById);

// Crear nuevo cliente
router.post('/', clientesController.createCliente);

// Actualizar cliente
router.put('/:id', clientesController.updateCliente);

// Eliminar cliente
router.delete('/:id', clientesController.deleteCliente);

// ============================================================
// RUTAS DE CONTACTOS
// ============================================================

router.get('/:clienteId/contactos', clientesController.getContactos);
router.post('/:clienteId/contactos', clientesController.createContacto);
router.put('/:clienteId/contactos/:contactoId', clientesController.updateContacto);
router.delete('/:clienteId/contactos/:contactoId', clientesController.deleteContacto);

// ============================================================
// RUTAS DE FACTURAS
// ============================================================

router.get('/:clienteId/facturas', clientesController.getFacturas);
router.post('/:clienteId/facturas', clientesController.createFactura);
router.put('/:clienteId/facturas/:facturaId', clientesController.updateFactura);
router.delete('/:clienteId/facturas/:facturaId', clientesController.deleteFactura);

// ============================================================
// RUTAS DE CONTRATOS
// ============================================================

router.get('/:clienteId/contratos', clientesController.getContratos);
router.post('/:clienteId/contratos', clientesController.createContrato);
router.put('/:clienteId/contratos/:contratoId', clientesController.updateContrato);
router.delete('/:clienteId/contratos/:contratoId', clientesController.deleteContrato);

// ============================================================
// RUTAS DE PAGOS
// ============================================================

router.get('/:clienteId/pagos', clientesController.getPagos);
router.post('/:clienteId/pagos', clientesController.createPago);
router.put('/:clienteId/pagos/:pagoId', clientesController.updatePago);
router.delete('/:clienteId/pagos/:pagoId', clientesController.deletePago);

// ============================================================
// RUTAS DE REUNIONES
// ============================================================

router.get('/:clienteId/reuniones', clientesController.getReuniones);
router.post('/:clienteId/reuniones', clientesController.createReunion);
router.put('/:clienteId/reuniones/:reunionId', clientesController.updateReunion);
router.delete('/:clienteId/reuniones/:reunionId', clientesController.deleteReunion);

// ============================================================
// RUTAS DE TICKETS
// ============================================================

router.get('/:clienteId/tickets', clientesController.getTickets);
router.post('/:clienteId/tickets', clientesController.createTicket);
router.put('/:clienteId/tickets/:ticketId', clientesController.updateTicket);
router.delete('/:clienteId/tickets/:ticketId', clientesController.deleteTicket);

// ============================================================
// RUTAS DE PREFERENCIAS
// ============================================================

router.get('/:clienteId/preferencias', clientesController.getPreferencias);
router.post('/:clienteId/preferencias', clientesController.savePreferencias);
router.put('/:clienteId/preferencias', clientesController.savePreferencias);

module.exports = router;
