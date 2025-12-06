const db = require('../config/db');

// Obtener métricas generales del dashboard
exports.getDashboardMetrics = async (req, res) => {
  try {
    const [metrics] = await db.query(`
      SELECT 
        -- Métricas generales de clientes
        (SELECT COUNT(*) FROM clientes WHERE activo = 1) as total_clientes_activos,
        (SELECT COUNT(*) FROM clientes WHERE activo = 0) as total_clientes_inactivos,
        (SELECT COUNT(*) FROM clientes) as total_clientes,
        
        -- Métricas financieras
        (SELECT COALESCE(SUM(importe), 0) FROM cliente_facturas WHERE estado = 'Pagada') as ingresos_totales,
        (SELECT COALESCE(SUM(importe), 0) FROM cliente_facturas WHERE estado = 'Pendiente') as facturas_pendientes,
        (SELECT COALESCE(SUM(importe), 0) FROM cliente_facturas WHERE estado = 'Vencida') as facturas_vencidas,
        (SELECT COUNT(*) FROM cliente_facturas) as total_facturas,
        (SELECT COUNT(*) FROM cliente_facturas WHERE estado = 'Pagada') as facturas_pagadas,
        (SELECT COUNT(*) FROM cliente_facturas WHERE estado = 'Pendiente') as facturas_pendientes_count,
        (SELECT COUNT(*) FROM cliente_facturas WHERE estado = 'Vencida') as facturas_vencidas_count,
        
        -- Métricas de contratos
        (SELECT COUNT(*) FROM cliente_contratos WHERE estado = 'Vigente') as contratos_vigentes,
        (SELECT COUNT(*) FROM cliente_contratos WHERE estado = 'Finalizado') as contratos_finalizados,
        (SELECT COUNT(*) FROM cliente_contratos WHERE estado = 'Cancelado') as contratos_cancelados,
        (SELECT COALESCE(SUM(importe), 0) FROM cliente_contratos WHERE estado = 'Vigente') as valor_contratos_vigentes,
        
        -- Métricas de tickets
        (SELECT COUNT(*) FROM cliente_tickets WHERE estado = 'Abierta') as tickets_abiertos,
        (SELECT COUNT(*) FROM cliente_tickets WHERE estado = 'En progreso') as tickets_en_progreso,
        (SELECT COUNT(*) FROM cliente_tickets WHERE estado = 'Resuelta') as tickets_resueltos,
        (SELECT COUNT(*) FROM cliente_tickets WHERE estado = 'Cerrada') as tickets_cerrados,
        (SELECT COUNT(*) FROM cliente_tickets WHERE prioridad = 'Alta') as tickets_alta_prioridad,
        
        -- Métricas de reuniones
        (SELECT COUNT(*) FROM cliente_reuniones WHERE estado = 'Programada') as reuniones_programadas,
        (SELECT COUNT(*) FROM cliente_reuniones WHERE estado = 'Realizada') as reuniones_realizadas,
        (SELECT COUNT(*) FROM cliente_reuniones WHERE estado = 'Cancelada') as reuniones_canceladas,
        
        -- Métricas de pagos
        (SELECT COUNT(*) FROM cliente_pagos WHERE estado = 'Retrasado') as pagos_retrasados,
        (SELECT COUNT(*) FROM cliente_pagos WHERE estado = 'Impagado') as pagos_impagados,
        (SELECT COALESCE(AVG(retraso), 0) FROM cliente_pagos WHERE estado = 'Retrasado') as promedio_dias_retraso
    `);

    res.json(metrics[0]);
  } catch (error) {
    console.error('Error al obtener métricas del dashboard:', error);
    res.status(500).json({ message: 'Error al obtener las métricas', error: error.message });
  }
};

// Obtener distribución de clientes por línea de negocio
exports.getClientesPorLinea = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        linea,
        COUNT(*) as cantidad,
        ROUND((COUNT(*) * 100.0 / (SELECT COUNT(*) FROM clientes)), 2) as porcentaje
      FROM clientes
      WHERE linea IS NOT NULL AND linea != ''
      GROUP BY linea
      ORDER BY cantidad DESC
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener distribución por línea:', error);
    res.status(500).json({ message: 'Error al obtener distribución', error: error.message });
  }
};

// Obtener top 10 clientes por facturación
exports.getTopClientesPorFacturacion = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        c.id,
        c.nombre,
        c.linea,
        COALESCE(SUM(f.importe), 0) as total_facturado,
        COUNT(f.id) as num_facturas
      FROM clientes c
      LEFT JOIN cliente_facturas f ON c.id = f.cliente_id
      WHERE c.activo = 1
      GROUP BY c.id, c.nombre, c.linea
      ORDER BY total_facturado DESC
      LIMIT 10
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener top clientes:', error);
    res.status(500).json({ message: 'Error al obtener top clientes', error: error.message });
  }
};

// Obtener evolución mensual de ingresos (últimos 6 meses)
exports.getEvolucionIngresos = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        DATE_FORMAT(STR_TO_DATE(fecha, '%d/%m/%Y'), '%Y-%m') as mes,
        SUM(importe) as total,
        COUNT(*) as num_facturas
      FROM cliente_facturas
      WHERE estado = 'Pagada' 
        AND STR_TO_DATE(fecha, '%d/%m/%Y') >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(STR_TO_DATE(fecha, '%d/%m/%Y'), '%Y-%m')
      ORDER BY mes ASC
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener evolución de ingresos:', error);
    res.status(500).json({ message: 'Error al obtener evolución', error: error.message });
  }
};

// Obtener distribución de tickets por tipo
exports.getTicketsPorTipo = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        tipo,
        COUNT(*) as cantidad,
        SUM(CASE WHEN estado IN ('Abierta', 'En progreso') THEN 1 ELSE 0 END) as activos,
        SUM(CASE WHEN estado IN ('Resuelta', 'Cerrada') THEN 1 ELSE 0 END) as resueltos
      FROM cliente_tickets
      GROUP BY tipo
      ORDER BY cantidad DESC
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener tickets por tipo:', error);
    res.status(500).json({ message: 'Error al obtener tickets', error: error.message });
  }
};

// Obtener tasa de conversión de reuniones
exports.getReunionesStats = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        tipo,
        COUNT(*) as total,
        SUM(CASE WHEN estado = 'Realizada' THEN 1 ELSE 0 END) as realizadas,
        SUM(CASE WHEN estado = 'Programada' THEN 1 ELSE 0 END) as programadas,
        SUM(CASE WHEN estado = 'Cancelada' THEN 1 ELSE 0 END) as canceladas,
        ROUND((SUM(CASE WHEN estado = 'Realizada' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)), 2) as tasa_realizacion
      FROM cliente_reuniones
      GROUP BY tipo
      ORDER BY total DESC
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener stats de reuniones:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
};

// Obtener clientes con mayor riesgo (facturas vencidas, tickets abiertos, pagos retrasados)
exports.getClientesRiesgo = async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        c.id,
        c.nombre,
        c.linea,
        COALESCE(fv.facturas_vencidas, 0) as facturas_vencidas,
        COALESCE(fv.total_vencido, 0) as monto_vencido,
        COALESCE(ta.tickets_abiertos, 0) as tickets_abiertos,
        COALESCE(pr.pagos_retrasados, 0) as pagos_retrasados,
        (COALESCE(fv.facturas_vencidas, 0) * 3 + 
         COALESCE(ta.tickets_abiertos, 0) * 2 + 
         COALESCE(pr.pagos_retrasados, 0) * 2) as score_riesgo
      FROM clientes c
      LEFT JOIN (
        SELECT cliente_id, COUNT(*) as facturas_vencidas, SUM(importe) as total_vencido
        FROM cliente_facturas
        WHERE estado = 'Vencida'
        GROUP BY cliente_id
      ) fv ON c.id = fv.cliente_id
      LEFT JOIN (
        SELECT cliente_id, COUNT(*) as tickets_abiertos
        FROM cliente_tickets
        WHERE estado IN ('Abierta', 'En progreso') AND prioridad = 'Alta'
        GROUP BY cliente_id
      ) ta ON c.id = ta.cliente_id
      LEFT JOIN (
        SELECT cliente_id, COUNT(*) as pagos_retrasados
        FROM cliente_pagos
        WHERE estado = 'Retrasado'
        GROUP BY cliente_id
      ) pr ON c.id = pr.cliente_id
      WHERE c.activo = 1
      HAVING score_riesgo > 0
      ORDER BY score_riesgo DESC
      LIMIT 10
    `);

    res.json(data);
  } catch (error) {
    console.error('Error al obtener clientes de riesgo:', error);
    res.status(500).json({ message: 'Error al obtener clientes de riesgo', error: error.message });
  }
};

// Obtener métricas de satisfacción (preferencias y contactos)
exports.getSatisfaccionMetrics = async (req, res) => {
  try {
    const [metodoContacto] = await db.query(`
      SELECT metodo_contacto, COUNT(*) as cantidad
      FROM cliente_preferencias
      GROUP BY metodo_contacto
      ORDER BY cantidad DESC
    `);

    const [idioma] = await db.query(`
      SELECT idioma, COUNT(*) as cantidad
      FROM cliente_preferencias
      GROUP BY idioma
      ORDER BY cantidad DESC
    `);

    const [frecuencia] = await db.query(`
      SELECT frecuencia_contacto, COUNT(*) as cantidad
      FROM cliente_preferencias
      GROUP BY frecuencia_contacto
      ORDER BY cantidad DESC
    `);

    res.json({
      metodoContacto,
      idioma,
      frecuencia
    });
  } catch (error) {
    console.error('Error al obtener métricas de satisfacción:', error);
    res.status(500).json({ message: 'Error al obtener métricas', error: error.message });
  }
};

// Obtener actividad reciente (últimas acciones)
exports.getActividadReciente = async (req, res) => {
  try {
    const [reuniones] = await db.query(`
      SELECT 'reunion' as tipo, r.fecha, c.nombre as cliente, r.tipo as detalle
      FROM cliente_reuniones r
      JOIN clientes c ON r.cliente_id = c.id
      WHERE r.estado = 'Programada'
      ORDER BY STR_TO_DATE(r.fecha, '%d/%m/%Y - %H:%i') ASC
      LIMIT 5
    `);

    const [tickets] = await db.query(`
      SELECT 'ticket' as tipo, t.fecha, c.nombre as cliente, t.numero as detalle
      FROM cliente_tickets t
      JOIN clientes c ON t.cliente_id = c.id
      WHERE t.estado = 'Abierta'
      ORDER BY FIELD(t.prioridad, 'Alta', 'Media', 'Baja'), t.id DESC
      LIMIT 5
    `);

    const [facturas] = await db.query(`
      SELECT 'factura' as tipo, f.fecha, c.nombre as cliente, f.numero as detalle, f.estado
      FROM cliente_facturas f
      JOIN clientes c ON f.cliente_id = c.id
      WHERE f.estado = 'Pendiente'
      ORDER BY f.id DESC
      LIMIT 5
    `);

    res.json([...reuniones, ...tickets, ...facturas]);
  } catch (error) {
    console.error('Error al obtener actividad reciente:', error);
    res.status(500).json({ message: 'Error al obtener actividad', error: error.message });
  }
};
