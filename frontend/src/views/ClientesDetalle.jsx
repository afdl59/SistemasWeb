import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import ContactModal from '../components/ContactModal'
import { ConfirmModal } from '../components/Modal'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './LineasNegocio.css'

export default function ClientesDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [editing, setEditing] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('clientes')
    if (stored) {
      try {
        const arr = JSON.parse(stored)
        const found = arr.find(c => String(c.id) === String(id))
        if (found) {
          // ensure contacts array
          found.contacts = found.contacts || []
          setCliente(found)
          return
        }
      } catch (e) {}
    }
    // if not found, go back to list
    navigate('/Clientes')
  }, [id])

  const saveCliente = (data) => {
    setCliente(data)
    // update stored list
    try {
      const stored = JSON.parse(window.localStorage.getItem('clientes') || '[]')
      const updated = stored.map(s => s.id === data.id ? data : s)
      window.localStorage.setItem('clientes', JSON.stringify(updated))
    } catch (e) {}
  }

  const handleAddContact = () => { setEditingContact(null); setShowContactModal(true) }
  const handleEditContact = (c) => { setEditingContact(c); setShowContactModal(true) }
  const handleSaveContact = (cData) => {
    const next = { ...cliente }
    next.contacts = next.contacts || []
    const exists = next.contacts.find(x => x.id === cData.id)
    if (exists) next.contacts = next.contacts.map(x => x.id === cData.id ? cData : x)
    else next.contacts = [cData, ...next.contacts]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteContact = (c) => setDeletingContact(c)
  const confirmDeleteContact = () => {
    if (!deletingContact) return
    const next = { ...cliente }
    next.contacts = (next.contacts || []).filter(x => x.id !== deletingContact.id)
    setCliente(next)
    saveCliente(next)
    setDeletingContact(null)
  }

  if (!cliente) return null

  return (
    <div className="lineas-page">
      <SideMenu />
      <div className="lineas-table-container">
        <div className="lineas-header">
          <h1>👥 {cliente.nombre}</h1>
          <div>
            <button className="btn btn-primary" onClick={() => setEditing(true)}><FaEdit /> Editar</button>
            <button className="btn" onClick={() => navigate('/Clientes')}>Volver</button>
          </div>
        </div>

        <div className="client-detail">
          <table className="lineas-table">
            <tbody>
              <tr><th>Nombre</th><td>{cliente.nombre}</td></tr>
              <tr><th>CIF/NIF</th><td>{cliente.cif}</td></tr>
              <tr><th>Email</th><td><a href={`mailto:${cliente.email}`}>{cliente.email}</a></td></tr>
              <tr><th>Teléfono</th><td><a href={`tel:${cliente.telefono}`}>{cliente.telefono}</a></td></tr>
              <tr><th>Línea de Negocio</th><td>{cliente.linea}</td></tr>
              <tr><th>Estado</th><td><span className={`status-badge ${cliente.activo ? 'active' : 'inactive'}`}>{cliente.activo ? 'Activo' : 'Inactivo'}</span></td></tr>
            </tbody>
          </table>

          <div style={{ marginTop: 18 }}>
            <h3>Contactos</h3>
            <div style={{ marginBottom: 8 }}>
              <button className="btn btn-primary" onClick={handleAddContact}><FaPlus /> Nuevo Contacto</button>
            </div>
            <table className="lineas-table">
              <thead>
                <tr><th>Nombre</th><th>Cargo</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {(cliente.contacts || []).map(c => (
                  <tr key={c.id}>
                    <td>{c.nombre}</td>
                    <td>{c.cargo}</td>
                    <td><a href={`mailto:${c.email}`}>{c.email}</a></td>
                    <td><a href={`tel:${c.telefono}`}>{c.telefono}</a></td>
                    <td className="actions-cell">
                      <button className="btn btn-sm btn-secondary" onClick={() => handleEditContact(c)} title="Editar"><FaEdit /></button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteContact(c)} title="Eliminar"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
                {(!cliente.contacts || cliente.contacts.length === 0) && (
                  <tr><td colSpan={5}>No hay contactos para este cliente.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ClienteModal isOpen={editing} onClose={() => setEditing(false)} onSave={(d) => { saveCliente(d); setEditing(false); }} cliente={cliente} />

        <ContactModal isOpen={showContactModal} onClose={() => { setShowContactModal(false); setEditingContact(null) }} onSave={handleSaveContact} contact={editingContact} />

        <ConfirmModal isOpen={!!deletingContact} onClose={() => setDeletingContact(null)} onConfirm={confirmDeleteContact} title="⚠️ Eliminar Contacto" message={`¿Eliminar al contacto "${deletingContact?.nombre}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

      </div>
    </div>
  )
}
