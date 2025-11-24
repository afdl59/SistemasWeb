// Simple localStorage helpers for clientes (persistent between browser sessions)
const KEY = 'clientes'

export function getClientes() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch (e) {
    console.error('getClientes parse error', e)
    return null
  }
}

export function saveClientes(arr) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(arr))
    return true
  } catch (e) {
    console.error('saveClientes error', e)
    return false
  }
}

export function getClienteById(id) {
  const list = getClientes() || []
  return list.find(c => String(c.id) === String(id)) || null
}
