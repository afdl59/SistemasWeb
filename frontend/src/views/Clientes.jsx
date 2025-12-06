import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaEye, FaFileContract } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import * as clienteService from '../services/clienteService'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import { ConfirmModal } from '../components/Modal'
import './LineasNegocio.css'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [deletingCliente, setDeletingCliente] = useState(null)
  const [togglingCliente, setTogglingCliente] = useState(null)

  const loadClientes = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await clienteService.getAllClientes()
      setClientes(data)
    } catch (err) {
      console.error('Error al cargar clientes:', err)
      setError('Error al cargar los clientes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClientes()
  }, [])

  const navigate = useNavigate()
  const handleViewContracts = (c) => navigate(`/Clientes/${c.id}?tab=contratos`)

  const handleCreate = () => setShowCreateModal(true)
  const handleEdit = (c) => setEditingCliente(c)
  const handleView = (c) => navigate(`/Clientes/${c.id}?tab=facturas`)
  
  const handleSave = async (clienteData) => {
    try {
      setError('')
      if (editingCliente) {
        await clienteService.updateCliente(editingCliente.id, clienteData)
        setEditingCliente(null)
      } else {
        await clienteService.createCliente(clienteData)
        setShowCreateModal(false)
      }
      await loadClientes()
    } catch (err) {
      console.error('Error al guardar cliente:', err)
      setError('Error al guardar el cliente')
    }
  }

  const handleToggleStatus = (c) => setTogglingCliente(c)
  const handleConfirmToggle = async () => {
    if (togglingCliente) {
      try {
        setError('')
        await clienteService.updateCliente(togglingCliente.id, {
          ...togglingCliente,
          activo: !togglingCliente.activo
        })
        setTogglingCliente(null)
        await loadClientes()
      } catch (err) {
        console.error('Error al cambiar estado:', err)
        setError('Error al cambiar el estado del cliente')
      }
    }
  }

  const handleDelete = (c) => setDeletingCliente(c)
  const handleConfirmDelete = async () => {
    if (deletingCliente) {
      try {
        setError('')
        await clienteService.deleteCliente(deletingCliente.id)
        setDeletingCliente(null)
        await loadClientes()
      } catch (err) {
        console.error('Error al eliminar cliente:', err)
        setError('Error al eliminar el cliente')
      }
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
