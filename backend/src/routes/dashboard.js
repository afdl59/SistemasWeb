const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Ruta para obtener métricas generales del dashboard
router.get('/metrics', dashboardController.getDashboardMetrics);

// Ruta para obtener distribución de clientes por línea de negocio
router.get('/clientes-por-linea', dashboardController.getClientesPorLinea);

// Ruta para obtener top 10 clientes por facturación
router.get('/top-clientes', dashboardController.getTopClientesPorFacturacion);

// Ruta para obtener evolución mensual de ingresos
router.get('/evolucion-ingresos', dashboardController.getEvolucionIngresos);

// Ruta para obtener distribución de tickets por tipo
router.get('/tickets-por-tipo', dashboardController.getTicketsPorTipo);

// Ruta para obtener estadísticas de reuniones
router.get('/reuniones-stats', dashboardController.getReunionesStats);

// Ruta para obtener clientes con mayor riesgo
router.get('/clientes-riesgo', dashboardController.getClientesRiesgo);

// Ruta para obtener métricas de satisfacción
router.get('/satisfaccion', dashboardController.getSatisfaccionMetrics);

// Ruta para obtener actividad reciente
router.get('/actividad-reciente', dashboardController.getActividadReciente);

module.exports = router;
