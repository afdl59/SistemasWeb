const db = require('../config/db');

// Obtener todos los pedidos con información relacionada
const getAllPedidos = async (req, res) => {
  try {
    const { estado, vertical_id, provincia_id, owner_id, search } = req.query;
    
    let query = `
      SELECT 
        p.*,
        u.nombre as owner_nombre,
        u.username as owner_username,
        prov.nombre as provincia_nombre,
        v.nombre as vertical_nombre
      FROM pedidos p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN provincias prov ON p.provincia_id = prov.id
      LEFT JOIN verticales v ON p.vertical_id = v.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (estado) {
      query += ' AND p.estado = ?';
      params.push(estado);
    }
    
    if (vertical_id) {
      query += ' AND p.vertical_id = ?';
      params.push(vertical_id);
    }
    
    if (provincia_id) {
      query += ' AND p.provincia_id = ?';
      params.push(provincia_id);
    }
    
    if (owner_id) {
      query += ' AND p.owner_id = ?';
      params.push(owner_id);
    }
    
    if (search) {
      query += ' AND (p.cliente LIKE ? OR p.nif LIKE ?)';
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern);
    }
    
    query += ' ORDER BY p.fecha_creacion DESC';
    
    const [pedidos] = await db.query(query, params);
    res.json(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
};

// Obtener un pedido por ID
const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        p.*,
        u.nombre as owner_nombre,
        u.username as owner_username,
        prov.nombre as provincia_nombre,
        v.nombre as vertical_nombre
      FROM pedidos p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN provincias prov ON p.provincia_id = prov.id
      LEFT JOIN verticales v ON p.vertical_id = v.id
      WHERE p.id = ?
    `;
    
    const [pedidos] = await db.query(query, [id]);
    
    if (pedidos.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    res.json(pedidos[0]);
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    res.status(500).json({ message: 'Error al obtener pedido', error: error.message });
  }
};

// Crear un nuevo pedido
const createPedido = async (req, res) => {
  try {
    const { cliente, nif, owner_id, provincia_id, vertical_id, estado, observaciones } = req.body;
    
    // Validaciones
    if (!cliente || !owner_id) {
      return res.status(400).json({ message: 'Cliente y owner son requeridos' });
    }
    
    const query = `
      INSERT INTO pedidos (cliente, nif, owner_id, provincia_id, vertical_id, estado, observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const [result] = await db.query(query, [
      cliente,
      nif || null,
      owner_id,
      provincia_id || null,
      vertical_id || null,
      estado || 'Presentada',
      observaciones || null
    ]);
    
    // Obtener el pedido recién creado con toda la información
    const [newPedido] = await db.query(`
      SELECT 
        p.*,
        u.nombre as owner_nombre,
        u.username as owner_username,
        prov.nombre as provincia_nombre,
        v.nombre as vertical_nombre
      FROM pedidos p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN provincias prov ON p.provincia_id = prov.id
      LEFT JOIN verticales v ON p.vertical_id = v.id
      WHERE p.id = ?
    `, [result.insertId]);
    
    res.status(201).json(newPedido[0]);
  } catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ message: 'Error al crear pedido', error: error.message });
  }
};

// Actualizar un pedido
const updatePedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { cliente, nif, owner_id, provincia_id, vertical_id, estado, observaciones } = req.body;
    
    // Validaciones
    if (!cliente || !owner_id) {
      return res.status(400).json({ message: 'Cliente y owner son requeridos' });
    }
    
    const query = `
      UPDATE pedidos 
      SET cliente = ?, nif = ?, owner_id = ?, provincia_id = ?, 
          vertical_id = ?, estado = ?, observaciones = ?
      WHERE id = ?
    `;
    
    const [result] = await db.query(query, [
      cliente,
      nif || null,
      owner_id,
      provincia_id || null,
      vertical_id || null,
      estado || 'Presentada',
      observaciones || null,
      id
    ]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    // Obtener el pedido actualizado
    const [updatedPedido] = await db.query(`
      SELECT 
        p.*,
        u.nombre as owner_nombre,
        u.username as owner_username,
        prov.nombre as provincia_nombre,
        v.nombre as vertical_nombre
      FROM pedidos p
      LEFT JOIN users u ON p.owner_id = u.id
      LEFT JOIN provincias prov ON p.provincia_id = prov.id
      LEFT JOIN verticales v ON p.vertical_id = v.id
      WHERE p.id = ?
    `, [id]);
    
    res.json(updatedPedido[0]);
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ message: 'Error al actualizar pedido', error: error.message });
  }
};

// Eliminar un pedido
const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await db.query('DELETE FROM pedidos WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    res.json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    res.status(500).json({ message: 'Error al eliminar pedido', error: error.message });
  }
};

module.exports = {
  getAllPedidos,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido
};
