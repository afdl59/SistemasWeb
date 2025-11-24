import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaEye, FaFileContract } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getClientes, saveClientes } from '../utils/storage'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import { ConfirmModal } from '../components/Modal'
import './LineasNegocio.css'

export default function Clientes() {
  const PLACEHOLDER = [
    { id: 1, nombre: 'Logística Martínez', cif: 'B12345678', email: 'contacto@logisticamartinez.com', telefono: '912345678', linea: 'Almacén y transporte', activo: true },
    { id: 2, nombre: 'Textiles Romero', cif: 'A87654321', email: 'info@textilesromero.es', telefono: '934567890', linea: 'Operarios producción', activo: true },
    { id: 3, nombre: 'Comercial Norte', cif: 'B11223344', email: 'ventas@comercialnorte.es', telefono: '911223344', linea: 'Tiendas y comercio', activo: false }
  ]

  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [deletingCliente, setDeletingCliente] = useState(null)
  const [togglingCliente, setTogglingCliente] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => {
        // load from localStorage if available (via helper)
        const stored = getClientes()
        if (stored && Array.isArray(stored) && stored.length > 0) setClientes(stored)
        else setClientes(PLACEHOLDER)
      setLoading(false)
    }, 200)
    return () => clearTimeout(t)
  }, [])

  // persist clientes so the detail page can read them by id
  useEffect(() => {
    // keep a mirror save; use helper
    saveClientes(clientes)
  }, [clientes])

  const persist = (next) => saveClientes(next)

  const navigate = useNavigate()
  const handleViewContracts = (c) => navigate(`/Clientes/${c.id}?tab=contratos`)

  const handleCreate = () => setShowCreateModal(true)
  const handleEdit = (c) => setEditingCliente(c)
  const handleView = (c) => navigate(`/Clientes/${c.id}?tab=facturas`)
  const handleSave = (clienteData) => {
    // ensure contacts array exists
    const normalized = { ...clienteData, contacts: clienteData.contacts || [] }
    if (editingCliente) {
      setClientes(prev => {
        const next = prev.map(p => p.id === editingCliente.id ? { ...p, ...normalized } : p)
        persist(next)
        return next
      })
      setEditingCliente(null)
    } else {
      setClientes(prev => {
        const next = [normalized, ...prev]
        persist(next)
        return next
      })
      setShowCreateModal(false)
    }
  }

  const handleToggleStatus = (c) => setTogglingCliente(c)
  const handleConfirmToggle = () => {
    if (togglingCliente) {
      setClientes(prev => {
        const next = prev.map(p => p.id === togglingCliente.id ? { ...p, activo: !p.activo } : p)
        persist(next)
        return next
      })
      setTogglingCliente(null)
    }
  }

  const handleDelete = (c) => setDeletingCliente(c)
  const handleConfirmDelete = () => {
    if (deletingCliente) {
      setClientes(prev => {
        const next = prev.filter(p => p.id !== deletingCliente.id)
        persist(next)
        return next
      })
      setDeletingCliente(null)
    }
  }

  if (loading) return <div className="loading">Cargando clientes...</div>

  return (
    <div className="lineas-page">
      <SideMenu />
      <div className="lineas-table-container">
        <div className="lineas-header">
          <h1>👥 Gestión de Clientes</h1>
          <button className="btn btn-primary" onClick={handleCreate}>
            <FaPlus /> Crear Cliente
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <table className="lineas-table">
          <thead>
            <tr>
              <th>Nombre del Cliente</th>
              <th>CIF/NIF</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Línea de Negocio asociada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id} className={!cliente.activo ? 'inactive-row' : ''}>
                <td className="linea-name">{cliente.nombre}</td>
                <td>{cliente.cif}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td className="descripcion-cell"><span className="descripcion-text">{cliente.linea}</span></td>
                <td>
                  <span className={`status-badge ${cliente.activo ? 'active' : 'inactive'}`}>
                    {cliente.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="actions-cell">
                  <div style={{ marginBottom: 6 }}>
                    <span className="descripcion-text">{cliente.contracts && cliente.contracts.length > 0 ? cliente.contracts[0].tipo : '—'}</span>
                  </div>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleViewContracts(cliente)} title="Ver contratos"><FaFileContract /></button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleView(cliente)} title="Ver cliente"><FaEye /></button>
                  <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(cliente)} title="Editar cliente"><FaEdit /></button>
                  <button className={`btn btn-sm ${cliente.activo ? 'btn-warning' : 'btn-success'}`} onClick={() => handleToggleStatus(cliente)} title={cliente.activo ? 'Desactivar' : 'Activar'}>
                    {cliente.activo ? <FaToggleOff /> : <FaToggleOn />}
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cliente)} title="Eliminar"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {clientes.length === 0 && (
          <div className="no-lineas">
            <h3>📋 No hay clientes</h3>
            <p>Empieza creando tu primer cliente</p>
            <button className="btn btn-primary" onClick={handleCreate}><FaPlus /> Crear Cliente</button>
          </div>
        )}

        <ClienteModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={handleSave} />

        <ClienteModal isOpen={!!editingCliente} onClose={() => setEditingCliente(null)} onSave={handleSave} cliente={editingCliente} />

        <ConfirmModal isOpen={!!deletingCliente} onClose={() => setDeletingCliente(null)} onConfirm={handleConfirmDelete} title="⚠️ Eliminar Cliente" message={`¿Eliminar al cliente "${deletingCliente?.nombre}"? Esta acción no se puede deshacer.`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

        <ConfirmModal isOpen={!!togglingCliente} onClose={() => setTogglingCliente(null)} onConfirm={handleConfirmToggle} title={togglingCliente?.activo ? '🔴 Desactivar Cliente' : '🟢 Activar Cliente'} message={`¿Cambiar el estado de "${togglingCliente?.nombre}" a ${togglingCliente?.activo ? 'INACTIVO' : 'ACTIVO'}?`} confirmText="Sí, cambiar" cancelText="Cancelar" isDanger={false} />
      </div>
    </div>
  )
}
