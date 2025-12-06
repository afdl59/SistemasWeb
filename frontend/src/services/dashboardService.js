const API_URL = 'http://localhost:3000/api/dashboard';

export const getDashboardMetrics = async () => {
  const response = await fetch(`${API_URL}/metrics`);
  if (!response.ok) throw new Error('Error al obtener métricas');
  return response.json();
};

export const getClientesPorLinea = async () => {
  const response = await fetch(`${API_URL}/clientes-por-linea`);
  if (!response.ok) throw new Error('Error al obtener distribución por línea');
  return response.json();
};

export const getTopClientes = async () => {
  const response = await fetch(`${API_URL}/top-clientes`);
  if (!response.ok) throw new Error('Error al obtener top clientes');
  return response.json();
};

export const getEvolucionIngresos = async () => {
  const response = await fetch(`${API_URL}/evolucion-ingresos`);
  if (!response.ok) throw new Error('Error al obtener evolución de ingresos');
  return response.json();
};

export const getTicketsPorTipo = async () => {
  const response = await fetch(`${API_URL}/tickets-por-tipo`);
  if (!response.ok) throw new Error('Error al obtener tickets por tipo');
  return response.json();
};

export const getReunionesStats = async () => {
  const response = await fetch(`${API_URL}/reuniones-stats`);
  if (!response.ok) throw new Error('Error al obtener estadísticas de reuniones');
  return response.json();
};

export const getClientesRiesgo = async () => {
  const response = await fetch(`${API_URL}/clientes-riesgo`);
  if (!response.ok) throw new Error('Error al obtener clientes de riesgo');
  return response.json();
};

export const getSatisfaccionMetrics = async () => {
  const response = await fetch(`${API_URL}/satisfaccion`);
  if (!response.ok) throw new Error('Error al obtener métricas de satisfacción');
  return response.json();
};

export const getActividadReciente = async () => {
  const response = await fetch(`${API_URL}/actividad-reciente`);
  if (!response.ok) throw new Error('Error al obtener actividad reciente');
  return response.json();
};
