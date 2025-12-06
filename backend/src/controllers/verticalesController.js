const db = require('../config/db');

// Obtener todas las verticales
const getAllVerticales = async (req, res) => {
  try {
    const [verticales] = await db.query('SELECT * FROM verticales ORDER BY nombre ASC');
    res.json(verticales);
  } catch (error) {
    console.error('Error al obtener verticales:', error);
    res.status(500).json({ message: 'Error al obtener verticales', error: error.message });
  }
};

// Obtener una vertical por ID
const getVerticalById = async (req, res) => {
  try {
    const { id } = req.params;
    const [verticales] = await db.query('SELECT * FROM verticales WHERE id = ?', [id]);
    
    if (verticales.length === 0) {
      return res.status(404).json({ message: 'Vertical no encontrada' });
    }
    
    res.json(verticales[0]);
  } catch (error) {
    console.error('Error al obtener vertical:', error);
    res.status(500).json({ message: 'Error al obtener vertical', error: error.message });
  }
};

// Crear una vertical
const createVertical = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const [result] = await db.query('INSERT INTO verticales (nombre) VALUES (?)', [nombre]);
    
    const [newVertical] = await db.query('SELECT * FROM verticales WHERE id = ?', [result.insertId]);
    
    res.status(201).json(newVertical[0]);
  } catch (error) {
    console.error('Error al crear vertical:', error);
    res.status(500).json({ message: 'Error al crear vertical', error: error.message });
  }
};

// Actualizar una vertical
const updateVertical = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const [result] = await db.query('UPDATE verticales SET nombre = ? WHERE id = ?', [nombre, id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vertical no encontrada' });
    }
    
    const [updatedVertical] = await db.query('SELECT * FROM verticales WHERE id = ?', [id]);
    
    res.json(updatedVertical[0]);
  } catch (error) {
    console.error('Error al actualizar vertical:', error);
    res.status(500).json({ message: 'Error al actualizar vertical', error: error.message });
  }
};

// Eliminar una vertical
const deleteVertical = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si hay pedidos asociados
    const [pedidos] = await db.query('SELECT COUNT(*) as count FROM pedidos WHERE vertical_id = ?', [id]);
    
    if (pedidos[0].count > 0) {
      return res.status(400).json({ 
        message: `No se puede eliminar la vertical porque tiene ${pedidos[0].count} pedido(s) asociado(s)` 
      });
    }
    
    const [result] = await db.query('DELETE FROM verticales WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vertical no encontrada' });
    }
    
    res.json({ message: 'Vertical eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar vertical:', error);
    res.status(500).json({ message: 'Error al eliminar vertical', error: error.message });
  }
};

module.exports = {
  getAllVerticales,
  getVerticalById,
  createVertical,
  updateVertical,
  deleteVertical
};
