const db = require('../config/db');

// ============================================================
// CLIENTES - CRUD Principal
// ============================================================

// Obtener todos los clientes
const getAllClientes = async (req, res) => {
  try {
    const [clientes] = await db.query(
      'SELECT * FROM clientes ORDER BY fecha_creacion DESC'
    );
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener un cliente por ID con todas sus relaciones
const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Cliente principal
    const [clientes] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (clientes.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    
    const cliente = clientes[0];
    
    // Cargar todas las relaciones
    const [contactos] = await db.query('SELECT * FROM cliente_contactos WHERE cliente_id = ?', [id]);
    const [facturas] = await db.query('SELECT * FROM cliente_facturas WHERE cliente_id = ? ORDER BY fecha DESC', [id]);
    const [contratos] = await db.query('SELECT * FROM cliente_contratos WHERE cliente_id = ? ORDER BY inicio DESC', [id]);
    const [pagos] = await db.query('SELECT * FROM cliente_pagos WHERE cliente_id = ? ORDER BY fecha_pago DESC', [id]);
    const [reuniones] = await db.query('SELECT * FROM cliente_reuniones WHERE cliente_id = ? ORDER BY fecha DESC', [id]);
    const [feedbacks] = await db.query('SELECT * FROM cliente_feedbacks WHERE cliente_id = ? ORDER BY fecha DESC', [id]);
    const [tickets] = await db.query('SELECT * FROM cliente_tickets WHERE cliente_id = ? ORDER BY fecha DESC', [id]);
    const [preferencias] = await db.query('SELECT * FROM cliente_preferencias WHERE cliente_id = ?', [id]);
    
    res.json({
      ...cliente,
      contactos,
      invoices: facturas,
      contracts: contratos,
      payments: pagos,
      meetings: reuniones,
      feedbacks,
      tickets,
      preferences: preferencias[0] || null
    });
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

// Crear nuevo cliente
const createCliente = async (req, res) => {
  try {
    const { nombre, cif, email, telefono, linea, activo } = req.body;
    
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO clientes (nombre, cif, email, telefono, linea, activo) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, cif || null, email || null, telefono || null, linea || null, activo !== undefined ? activo : true]
    );
    
    const [newCliente] = await db.query('SELECT * FROM clientes WHERE id = ?', [result.insertId]);
    res.status(201).json(newCliente[0]);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

// Actualizar cliente
const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, cif, email, telefono, linea, activo } = req.body;
    
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    
    await db.query(
      'UPDATE clientes SET nombre = ?, cif = ?, email = ?, telefono = ?, linea = ?, activo = ? WHERE id = ?',
      [nombre, cif || null, email || null, telefono || null, linea || null, activo !== undefined ? activo : true, id]
    );
    
    const [updatedCliente] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    res.json(updatedCliente[0]);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

// Eliminar cliente
const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};

// ============================================================
// CONTACTOS
// ============================================================

const getContactos = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [contactos] = await db.query('SELECT * FROM cliente_contactos WHERE cliente_id = ?', [clienteId]);
    res.json(contactos);
  } catch (error) {
    console.error('Error al obtener contactos:', error);
    res.status(500).json({ message: 'Error al obtener contactos' });
  }
};

const createContacto = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { nombre, cargo, email, telefono } = req.body;
    
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_contactos (cliente_id, nombre, cargo, email, telefono) VALUES (?, ?, ?, ?, ?)',
      [clienteId, nombre, cargo || null, email || null, telefono || null]
    );
    
    const [newContacto] = await db.query('SELECT * FROM cliente_contactos WHERE id = ?', [result.insertId]);
    res.status(201).json(newContacto[0]);
  } catch (error) {
    console.error('Error al crear contacto:', error);
    res.status(500).json({ message: 'Error al crear contacto' });
  }
};

const updateContacto = async (req, res) => {
  try {
    const { clienteId, contactoId } = req.params;
    const { nombre, cargo, email, telefono } = req.body;
    
    await db.query(
      'UPDATE cliente_contactos SET nombre = ?, cargo = ?, email = ?, telefono = ? WHERE id = ? AND cliente_id = ?',
      [nombre, cargo || null, email || null, telefono || null, contactoId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_contactos WHERE id = ?', [contactoId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar contacto:', error);
    res.status(500).json({ message: 'Error al actualizar contacto' });
  }
};

const deleteContacto = async (req, res) => {
  try {
    const { clienteId, contactoId } = req.params;
    await db.query('DELETE FROM cliente_contactos WHERE id = ? AND cliente_id = ?', [contactoId, clienteId]);
    res.json({ message: 'Contacto eliminado' });
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    res.status(500).json({ message: 'Error al eliminar contacto' });
  }
};

// ============================================================
// FACTURAS
// ============================================================

const getFacturas = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [facturas] = await db.query('SELECT * FROM cliente_facturas WHERE cliente_id = ? ORDER BY fecha DESC', [clienteId]);
    res.json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ message: 'Error al obtener facturas' });
  }
};

const createFactura = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { numero, fecha, importe, estado, metodo } = req.body;
    
    if (!numero || numero.trim() === '') {
      return res.status(400).json({ message: 'El número de factura es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_facturas (cliente_id, numero, fecha, importe, estado, metodo) VALUES (?, ?, ?, ?, ?, ?)',
      [clienteId, numero, fecha || null, importe || 0, estado || 'Pendiente', metodo || null]
    );
    
    const [newFactura] = await db.query('SELECT * FROM cliente_facturas WHERE id = ?', [result.insertId]);
    res.status(201).json(newFactura[0]);
  } catch (error) {
    console.error('Error al crear factura:', error);
    res.status(500).json({ message: 'Error al crear factura' });
  }
};

const updateFactura = async (req, res) => {
  try {
    const { clienteId, facturaId } = req.params;
    const { numero, fecha, importe, estado, metodo } = req.body;
    
    await db.query(
      'UPDATE cliente_facturas SET numero = ?, fecha = ?, importe = ?, estado = ?, metodo = ? WHERE id = ? AND cliente_id = ?',
      [numero, fecha || null, importe || 0, estado || 'Pendiente', metodo || null, facturaId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_facturas WHERE id = ?', [facturaId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar factura:', error);
    res.status(500).json({ message: 'Error al actualizar factura' });
  }
};

const deleteFactura = async (req, res) => {
  try {
    const { clienteId, facturaId } = req.params;
    await db.query('DELETE FROM cliente_facturas WHERE id = ? AND cliente_id = ?', [facturaId, clienteId]);
    res.json({ message: 'Factura eliminada' });
  } catch (error) {
    console.error('Error al eliminar factura:', error);
    res.status(500).json({ message: 'Error al eliminar factura' });
  }
};

// ============================================================
// CONTRATOS
// ============================================================

const getContratos = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [contratos] = await db.query('SELECT * FROM cliente_contratos WHERE cliente_id = ? ORDER BY inicio DESC', [clienteId]);
    res.json(contratos);
  } catch (error) {
    console.error('Error al obtener contratos:', error);
    res.status(500).json({ message: 'Error al obtener contratos' });
  }
};

const createContrato = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { numero, tipo, inicio, fin, importe, estado } = req.body;
    
    if (!numero || numero.trim() === '') {
      return res.status(400).json({ message: 'El número de contrato es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_contratos (cliente_id, numero, tipo, inicio, fin, importe, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [clienteId, numero, tipo || null, inicio || null, fin || null, importe || 0, estado || 'Vigente']
    );
    
    const [newContrato] = await db.query('SELECT * FROM cliente_contratos WHERE id = ?', [result.insertId]);
    res.status(201).json(newContrato[0]);
  } catch (error) {
    console.error('Error al crear contrato:', error);
    res.status(500).json({ message: 'Error al crear contrato' });
  }
};

const updateContrato = async (req, res) => {
  try {
    const { clienteId, contratoId } = req.params;
    const { numero, tipo, inicio, fin, importe, estado } = req.body;
    
    await db.query(
      'UPDATE cliente_contratos SET numero = ?, tipo = ?, inicio = ?, fin = ?, importe = ?, estado = ? WHERE id = ? AND cliente_id = ?',
      [numero, tipo || null, inicio || null, fin || null, importe || 0, estado || 'Vigente', contratoId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_contratos WHERE id = ?', [contratoId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar contrato:', error);
    res.status(500).json({ message: 'Error al actualizar contrato' });
  }
};

const deleteContrato = async (req, res) => {
  try {
    const { clienteId, contratoId } = req.params;
    await db.query('DELETE FROM cliente_contratos WHERE id = ? AND cliente_id = ?', [contratoId, clienteId]);
    res.json({ message: 'Contrato eliminado' });
  } catch (error) {
    console.error('Error al eliminar contrato:', error);
    res.status(500).json({ message: 'Error al eliminar contrato' });
  }
};

// ============================================================
// PAGOS
// ============================================================

const getPagos = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [pagos] = await db.query('SELECT * FROM cliente_pagos WHERE cliente_id = ? ORDER BY fecha_pago DESC', [clienteId]);
    res.json(pagos);
  } catch (error) {
    console.error('Error al obtener pagos:', error);
    res.status(500).json({ message: 'Error al obtener pagos' });
  }
};

const createPago = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { factura, fecha_pago, importe, metodo, fecha_limite, retraso, estado } = req.body;
    
    if (!importe || parseFloat(importe) <= 0) {
      return res.status(400).json({ message: 'El importe es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_pagos (cliente_id, factura, fecha_pago, importe, metodo, fecha_limite, retraso, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [clienteId, factura || null, fecha_pago || null, importe, metodo || null, fecha_limite || null, retraso || 0, estado || 'Pagado']
    );
    
    const [newPago] = await db.query('SELECT * FROM cliente_pagos WHERE id = ?', [result.insertId]);
    res.status(201).json(newPago[0]);
  } catch (error) {
    console.error('Error al crear pago:', error);
    res.status(500).json({ message: 'Error al crear pago' });
  }
};

const updatePago = async (req, res) => {
  try {
    const { clienteId, pagoId } = req.params;
    const { factura, fecha_pago, importe, metodo, fecha_limite, retraso, estado } = req.body;
    
    await db.query(
      'UPDATE cliente_pagos SET factura = ?, fecha_pago = ?, importe = ?, metodo = ?, fecha_limite = ?, retraso = ?, estado = ? WHERE id = ? AND cliente_id = ?',
      [factura || null, fecha_pago || null, importe, metodo || null, fecha_limite || null, retraso || 0, estado || 'Pagado', pagoId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_pagos WHERE id = ?', [pagoId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar pago:', error);
    res.status(500).json({ message: 'Error al actualizar pago' });
  }
};

const deletePago = async (req, res) => {
  try {
    const { clienteId, pagoId } = req.params;
    await db.query('DELETE FROM cliente_pagos WHERE id = ? AND cliente_id = ?', [pagoId, clienteId]);
    res.json({ message: 'Pago eliminado' });
  } catch (error) {
    console.error('Error al eliminar pago:', error);
    res.status(500).json({ message: 'Error al eliminar pago' });
  }
};

// ============================================================
// REUNIONES
// ============================================================

const getReuniones = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [reuniones] = await db.query('SELECT * FROM cliente_reuniones WHERE cliente_id = ? ORDER BY fecha DESC', [clienteId]);
    res.json(reuniones);
  } catch (error) {
    console.error('Error al obtener reuniones:', error);
    res.status(500).json({ message: 'Error al obtener reuniones' });
  }
};

const createReunion = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { fecha, tipo, descripcion, participantes, estado } = req.body;
    
    if (!fecha || fecha.trim() === '') {
      return res.status(400).json({ message: 'La fecha es obligatoria' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_reuniones (cliente_id, fecha, tipo, descripcion, participantes, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [clienteId, fecha, tipo || 'Videollamada', descripcion || null, participantes || null, estado || 'Programada']
    );
    
    const [newReunion] = await db.query('SELECT * FROM cliente_reuniones WHERE id = ?', [result.insertId]);
    res.status(201).json(newReunion[0]);
  } catch (error) {
    console.error('Error al crear reunión:', error);
    res.status(500).json({ message: 'Error al crear reunión' });
  }
};

const updateReunion = async (req, res) => {
  try {
    const { clienteId, reunionId } = req.params;
    const { fecha, tipo, descripcion, participantes, estado } = req.body;
    
    await db.query(
      'UPDATE cliente_reuniones SET fecha = ?, tipo = ?, descripcion = ?, participantes = ?, estado = ? WHERE id = ? AND cliente_id = ?',
      [fecha, tipo || 'Videollamada', descripcion || null, participantes || null, estado || 'Programada', reunionId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_reuniones WHERE id = ?', [reunionId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar reunión:', error);
    res.status(500).json({ message: 'Error al actualizar reunión' });
  }
};

const deleteReunion = async (req, res) => {
  try {
    const { clienteId, reunionId } = req.params;
    await db.query('DELETE FROM cliente_reuniones WHERE id = ? AND cliente_id = ?', [reunionId, clienteId]);
    res.json({ message: 'Reunión eliminada' });
  } catch (error) {
    console.error('Error al eliminar reunión:', error);
    res.status(500).json({ message: 'Error al eliminar reunión' });
  }
};



// ============================================================
// TICKETS
// ============================================================

const getTickets = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [tickets] = await db.query('SELECT * FROM cliente_tickets WHERE cliente_id = ? ORDER BY fecha DESC', [clienteId]);
    res.json(tickets);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ message: 'Error al obtener tickets' });
  }
};

const createTicket = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { numero, fecha, prioridad, tipo, descripcion, estado, responsable } = req.body;
    
    if (!numero || numero.trim() === '') {
      return res.status(400).json({ message: 'El número de ticket es obligatorio' });
    }
    
    const [result] = await db.query(
      'INSERT INTO cliente_tickets (cliente_id, numero, fecha, prioridad, tipo, descripcion, estado, responsable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [clienteId, numero, fecha || null, prioridad || 'Media', tipo || 'Soporte técnico', descripcion || null, estado || 'Abierta', responsable || null]
    );
    
    const [newTicket] = await db.query('SELECT * FROM cliente_tickets WHERE id = ?', [result.insertId]);
    res.status(201).json(newTicket[0]);
  } catch (error) {
    console.error('Error al crear ticket:', error);
    res.status(500).json({ message: 'Error al crear ticket' });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { clienteId, ticketId } = req.params;
    const { numero, fecha, prioridad, tipo, descripcion, estado, responsable } = req.body;
    
    await db.query(
      'UPDATE cliente_tickets SET numero = ?, fecha = ?, prioridad = ?, tipo = ?, descripcion = ?, estado = ?, responsable = ? WHERE id = ? AND cliente_id = ?',
      [numero, fecha || null, prioridad || 'Media', tipo || 'Soporte técnico', descripcion || null, estado || 'Abierta', responsable || null, ticketId, clienteId]
    );
    
    const [updated] = await db.query('SELECT * FROM cliente_tickets WHERE id = ?', [ticketId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al actualizar ticket:', error);
    res.status(500).json({ message: 'Error al actualizar ticket' });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { clienteId, ticketId } = req.params;
    await db.query('DELETE FROM cliente_tickets WHERE id = ? AND cliente_id = ?', [ticketId, clienteId]);
    res.json({ message: 'Ticket eliminado' });
  } catch (error) {
    console.error('Error al eliminar ticket:', error);
    res.status(500).json({ message: 'Error al eliminar ticket' });
  }
};

// ============================================================
// PREFERENCIAS
// ============================================================

const getPreferencias = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const [preferencias] = await db.query('SELECT * FROM cliente_preferencias WHERE cliente_id = ?', [clienteId]);
    res.json(preferencias[0] || null);
  } catch (error) {
    console.error('Error al obtener preferencias:', error);
    res.status(500).json({ message: 'Error al obtener preferencias' });
  }
};

const savePreferencias = async (req, res) => {
  try {
    const { clienteId } = req.params;
    const { metodo_contacto, franja_horaria, idioma, frecuencia_contacto, nivel_formalidad, notas } = req.body;
    
    // Verificar si ya existen preferencias
    const [existing] = await db.query('SELECT id FROM cliente_preferencias WHERE cliente_id = ?', [clienteId]);
    
    if (existing.length > 0) {
      // Actualizar
      await db.query(
        'UPDATE cliente_preferencias SET metodo_contacto = ?, franja_horaria = ?, idioma = ?, frecuencia_contacto = ?, nivel_formalidad = ?, notas = ? WHERE cliente_id = ?',
        [metodo_contacto || 'Email', franja_horaria || 'Tarde (16:00 – 20:00)', idioma || 'Español', frecuencia_contacto || 'Mensual', nivel_formalidad || 'Neutral', notas || null, clienteId]
      );
    } else {
      // Crear
      await db.query(
        'INSERT INTO cliente_preferencias (cliente_id, metodo_contacto, franja_horaria, idioma, frecuencia_contacto, nivel_formalidad, notas) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [clienteId, metodo_contacto || 'Email', franja_horaria || 'Tarde (16:00 – 20:00)', idioma || 'Español', frecuencia_contacto || 'Mensual', nivel_formalidad || 'Neutral', notas || null]
      );
    }
    
    const [updated] = await db.query('SELECT * FROM cliente_preferencias WHERE cliente_id = ?', [clienteId]);
    res.json(updated[0]);
  } catch (error) {
    console.error('Error al guardar preferencias:', error);
    res.status(500).json({ message: 'Error al guardar preferencias' });
  }
};

module.exports = {
  // Clientes
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  
  // Contactos
  getContactos,
  createContacto,
  updateContacto,
  deleteContacto,
  
  // Facturas
  getFacturas,
  createFactura,
  updateFactura,
  deleteFactura,
  
  // Contratos
  getContratos,
  createContrato,
  updateContrato,
  deleteContrato,
  
  // Pagos
  getPagos,
  createPago,
  updatePago,
  deletePago,
  
  // Reuniones
  getReuniones,
  createReunion,
  updateReunion,
  deleteReunion,
  
  // Tickets
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  
  // Preferencias
  getPreferencias,
  savePreferencias
};
