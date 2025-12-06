const API_URL = 'http://localhost:3000';

const verticalService = {
  // Obtener todas las verticales
  async getAllVerticales() {
    const response = await fetch(`${API_URL}/api/verticales`);
    
    if (!response.ok) {
      throw new Error('Error al obtener verticales');
    }
    
    return await response.json();
  },

  // Crear una vertical
  async createVertical(verticalData) {
    const response = await fetch(`${API_URL}/api/verticales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verticalData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear la vertical');
    }
    
    return await response.json();
  },

  // Actualizar una vertical
  async updateVertical(id, verticalData) {
    const response = await fetch(`${API_URL}/api/verticales/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(verticalData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar la vertical');
    }
    
    return await response.json();
  },

  // Eliminar una vertical
  async deleteVertical(id) {
    const response = await fetch(`${API_URL}/api/verticales/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar la vertical');
    }
    
    return await response.json();
  }
};

export default verticalService;
