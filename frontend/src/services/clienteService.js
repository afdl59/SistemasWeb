const API_URL = 'http://localhost:3000/api';

// ============================================================
// CLIENTES
// ============================================================

export const getAllClientes = async () => {
  const response = await fetch(`${API_URL}/clientes`);
  if (!response.ok) throw new Error('Error al obtener clientes');
  return response.json();
};

export const getClienteById = async (id) => {
  const response = await fetch(`${API_URL}/clientes/${id}`);
  if (!response.ok) throw new Error('Error al obtener cliente');
  return response.json();
};

export const createCliente = async (clienteData) => {
  const response = await fetch(`${API_URL}/clientes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clienteData)
  });
  if (!response.ok) throw new Error('Error al crear cliente');
  return response.json();
};

export const updateCliente = async (id, clienteData) => {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(clienteData)
  });
  if (!response.ok) throw new Error('Error al actualizar cliente');
  return response.json();
};

export const deleteCliente = async (id) => {
  const response = await fetch(`${API_URL}/clientes/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar cliente');
  return response.json();
};

// ============================================================
// CONTACTOS
// ============================================================

export const getContactos = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contactos`);
  if (!response.ok) throw new Error('Error al obtener contactos');
  return response.json();
};

export const createContacto = async (clienteId, contactoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contactos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactoData)
  });
  if (!response.ok) throw new Error('Error al crear contacto');
  return response.json();
};

export const updateContacto = async (clienteId, contactoId, contactoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contactos/${contactoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactoData)
  });
  if (!response.ok) throw new Error('Error al actualizar contacto');
  return response.json();
};

export const deleteContacto = async (clienteId, contactoId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contactos/${contactoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar contacto');
  return response.json();
};

// ============================================================
// FACTURAS
// ============================================================

export const getFacturas = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/facturas`);
  if (!response.ok) throw new Error('Error al obtener facturas');
  return response.json();
};

export const createFactura = async (clienteId, facturaData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/facturas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(facturaData)
  });
  if (!response.ok) throw new Error('Error al crear factura');
  return response.json();
};

export const updateFactura = async (clienteId, facturaId, facturaData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/facturas/${facturaId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(facturaData)
  });
  if (!response.ok) throw new Error('Error al actualizar factura');
  return response.json();
};

export const deleteFactura = async (clienteId, facturaId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/facturas/${facturaId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar factura');
  return response.json();
};

// ============================================================
// CONTRATOS
// ============================================================

export const getContratos = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contratos`);
  if (!response.ok) throw new Error('Error al obtener contratos');
  return response.json();
};

export const createContrato = async (clienteId, contratoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contratos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contratoData)
  });
  if (!response.ok) throw new Error('Error al crear contrato');
  return response.json();
};

export const updateContrato = async (clienteId, contratoId, contratoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contratos/${contratoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contratoData)
  });
  if (!response.ok) throw new Error('Error al actualizar contrato');
  return response.json();
};

export const deleteContrato = async (clienteId, contratoId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/contratos/${contratoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar contrato');
  return response.json();
};

// ============================================================
// PAGOS
// ============================================================

export const getPagos = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/pagos`);
  if (!response.ok) throw new Error('Error al obtener pagos');
  return response.json();
};

export const createPago = async (clienteId, pagoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/pagos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pagoData)
  });
  if (!response.ok) throw new Error('Error al crear pago');
  return response.json();
};

export const updatePago = async (clienteId, pagoId, pagoData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/pagos/${pagoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pagoData)
  });
  if (!response.ok) throw new Error('Error al actualizar pago');
  return response.json();
};

export const deletePago = async (clienteId, pagoId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/pagos/${pagoId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar pago');
  return response.json();
};

// ============================================================
// REUNIONES
// ============================================================

export const getReuniones = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/reuniones`);
  if (!response.ok) throw new Error('Error al obtener reuniones');
  return response.json();
};

export const createReunion = async (clienteId, reunionData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/reuniones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reunionData)
  });
  if (!response.ok) throw new Error('Error al crear reunión');
  return response.json();
};

export const updateReunion = async (clienteId, reunionId, reunionData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/reuniones/${reunionId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reunionData)
  });
  if (!response.ok) throw new Error('Error al actualizar reunión');
  return response.json();
};

export const deleteReunion = async (clienteId, reunionId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/reuniones/${reunionId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar reunión');
  return response.json();
};

// ============================================================
// TICKETS
// ============================================================

export const getTickets = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/tickets`);
  if (!response.ok) throw new Error('Error al obtener tickets');
  return response.json();
};

export const createTicket = async (clienteId, ticketData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  if (!response.ok) throw new Error('Error al crear ticket');
  return response.json();
};

export const updateTicket = async (clienteId, ticketId, ticketData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/tickets/${ticketId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticketData)
  });
  if (!response.ok) throw new Error('Error al actualizar ticket');
  return response.json();
};

export const deleteTicket = async (clienteId, ticketId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/tickets/${ticketId}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Error al eliminar ticket');
  return response.json();
};

// ============================================================
// PREFERENCIAS
// ============================================================

export const getPreferencias = async (clienteId) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/preferencias`);
  if (!response.ok) throw new Error('Error al obtener preferencias');
  return response.json();
};

export const savePreferencias = async (clienteId, preferenciasData) => {
  const response = await fetch(`${API_URL}/clientes/${clienteId}/preferencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferenciasData)
  });
  if (!response.ok) throw new Error('Error al guardar preferencias');
  return response.json();
};
