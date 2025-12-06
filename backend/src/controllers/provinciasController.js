const db = require('../config/db');

// Obtener todas las provincias
const getAllProvincias = async (req, res) => {
  try {
    const [provincias] = await db.query('SELECT * FROM provincias ORDER BY nombre ASC');
    res.json(provincias);
  } catch (error) {
    console.error('Error al obtener provincias:', error);
    res.status(500).json({ message: 'Error al obtener provincias', error: error.message });
  }
};

// Obtener una provincia por ID
const getProvinciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [provincias] = await db.query('SELECT * FROM provincias WHERE id = ?', [id]);
    
    if (provincias.length === 0) {
      return res.status(404).json({ message: 'Provincia no encontrada' });
    }
    
    res.json(provincias[0]);
  } catch (error) {
    console.error('Error al obtener provincia:', error);
    res.status(500).json({ message: 'Error al obtener provincia', error: error.message });
  }
};

module.exports = {
  getAllProvincias,
  getProvinciaById
};
