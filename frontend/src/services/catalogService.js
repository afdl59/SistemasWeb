const API_URL = 'http://localhost:3000';

const catalogService = {
  // Obtener todas las provincias
  async getProvincias() {
    const response = await fetch(`${API_URL}/api/provincias`);
    
    if (!response.ok) {
      throw new Error('Error al obtener provincias');
    }
    
    return await response.json();
  },

  // Obtener todas las verticales
  async getVerticales() {
    const response = await fetch(`${API_URL}/api/verticales`);
    
    if (!response.ok) {
      throw new Error('Error al obtener verticales');
    }
    
    return await response.json();
  }
};

export default catalogService;
