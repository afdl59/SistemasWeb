const API_URL = 'http://localhost:3000';

const pedidoService = {
  // Obtener todos los pedidos con filtros opcionales
  async getAllPedidos(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.estado) params.append('estado', filters.estado);
    if (filters.vertical_id) params.append('vertical_id', filters.vertical_id);
    if (filters.provincia_id) params.append('provincia_id', filters.provincia_id);
    if (filters.owner_id) params.append('owner_id', filters.owner_id);
    
    const queryString = params.toString();
    const url = `${API_URL}/api/pedidos${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Error al obtener pedidos');
    }
    
    return await response.json();
  },

  // Obtener un pedido por ID
  async getPedidoById(id) {
    const response = await fetch(`${API_URL}/api/pedidos/${id}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener el pedido');
    }
    
    return await response.json();
  },

  // Crear un nuevo pedido
  async createPedido(pedidoData) {
    const response = await fetch(`${API_URL}/api/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidoData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear el pedido');
    }
    
    return await response.json();
  },

  // Actualizar un pedido
  async updatePedido(id, pedidoData) {
    const response = await fetch(`${API_URL}/api/pedidos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidoData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar el pedido');
    }
    
    return await response.json();
  },

  // Eliminar un pedido
  async deletePedido(id) {
    const response = await fetch(`${API_URL}/api/pedidos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar el pedido');
    }
    
    return await response.json();
  },

  // Exportar pedidos a CSV
  exportToCSV(pedidos) {
    const headers = ['ID', 'Cliente', 'NIF', 'Owner', 'Provincia', 'Vertical', 'Estado', 'Fecha Creación', 'Observaciones'];
    const rows = pedidos.map(p => [
      p.id,
      p.cliente,
      p.nif || '',
      p.owner_nombre || '',
      p.provincia_nombre || '',
      p.vertical_nombre || '',
      p.estado,
      new Date(p.fecha_creacion).toLocaleDateString('es-ES'),
      (p.observaciones || '').replace(/"/g, '""')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default pedidoService;
