import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import ContactModal from '../components/ContactModal'
import { ConfirmModal } from '../components/Modal'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './LineasNegocio.css'
import { getClienteById, getClientes, saveClientes } from '../utils/storage'
import { useLocation } from 'react-router-dom'
import InvoiceModal from '../components/InvoiceModal'
import { FaEye } from 'react-icons/fa'

export default function ClientesDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cliente, setCliente] = useState(null)
  const [editing, setEditing] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
  const [activeTab, setActiveTab] = useState('datos')
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)
  const [deletingInvoice, setDeletingInvoice] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const found = getClienteById(id)
    if (found) {
      found.contacts = found.contacts || []
      // ensure invoices exist (sample data) for demo if absent
      if (!found.invoices || !Array.isArray(found.invoices) || found.invoices.length === 0) {
        found.invoices = [
          { id: Date.now() + 1, numero: 'FAC-2024-001', fecha: '05/01/2024', importe: 1250.00, estado: 'Pagada', metodo: 'Transferencia bancaria' },
          { id: Date.now() + 2, numero: 'FAC-2024-002', fecha: '20/02/2024', importe: 890.00, estado: 'Pendiente', metodo: 'Tarjeta' },
          { id: Date.now() + 3, numero: 'FAC-2024-003', fecha: '10/03/2024', importe: 2100.00, estado: 'Vencida', metodo: 'Domiciliación' }
        ]
      }
      setCliente(found)
      return
    }
    // not found -> go back
    navigate('/Clientes')
  }, [id])

  useEffect(() => {
    const qp = new URLSearchParams(location.search)
    const tab = qp.get('tab')
    if (tab === 'facturas') setActiveTab('facturas')
  }, [location.search])

  const saveCliente = (data) => {
    setCliente(data)
    // update stored list
    try {
      const stored = getClientes() || []
      const updated = stored.map(s => s.id === data.id ? data : s)
      saveClientes(updated)
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

  // Invoices handlers
  const handleAddInvoice = () => { setEditingInvoice(null); setInvoiceModalOpen(true) }
  const handleEditInvoice = (inv) => { setEditingInvoice(inv); setInvoiceModalOpen(true) }
  const handleSaveInvoice = (invData) => {
    const next = { ...cliente }
    next.invoices = next.invoices || []
    const exists = next.invoices.find(x => x.id === invData.id)
    if (exists) next.invoices = next.invoices.map(x => x.id === invData.id ? invData : x)
    else next.invoices = [invData, ...next.invoices]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteInvoice = (inv) => setDeletingInvoice(inv)
  const confirmDeleteInvoice = () => {
    if (!deletingInvoice) return
    const next = { ...cliente }
    next.invoices = (next.invoices || []).filter(x => x.id !== deletingInvoice.id)
    setCliente(next)
    saveCliente(next)
    setDeletingInvoice(null)
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
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button className={`btn ${activeTab === 'datos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('datos')}>Datos del cliente</button>
            <button className={`btn ${activeTab === 'facturas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('facturas')}>Facturas</button>
          </div>

          {activeTab === 'datos' && (
            <>
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
            </>
          )}

          {activeTab === 'facturas' && (
            <>
              <div className="lineas-header">
                <h1>📄 Facturas de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={handleAddInvoice}>Crear Factura</button>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>Número de factura</th>
                    <th>Fecha</th>
                    <th>Importe</th>
                    <th>Estado</th>
                    <th>Método de pago</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.invoices || []).map(inv => (
                    <tr key={inv.id}>
                      <td className="linea-name">{inv.numero}</td>
                      <td>{inv.fecha}</td>
                      <td>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(inv.importe)}</td>
                      <td>
                        {inv.estado === 'Pagada' && <span className="status-badge active">Pagada</span>}
                        {inv.estado === 'Pendiente' && <span className="status-badge btn-warning">Pendiente</span>}
                        {inv.estado === 'Vencida' && <span className="status-badge inactive">Vencida</span>}
                      </td>
                      <td>{inv.metodo}</td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => handleEditInvoice(inv)} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteInvoice(inv)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.invoices || cliente.invoices.length === 0) && (
                    <tr><td colSpan={6}>No hay facturas para este cliente.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>

        <ClienteModal isOpen={editing} onClose={() => setEditing(false)} onSave={(d) => { saveCliente(d); setEditing(false); }} cliente={cliente} />

        <ContactModal isOpen={showContactModal} onClose={() => { setShowContactModal(false); setEditingContact(null) }} onSave={handleSaveContact} contact={editingContact} />

        <InvoiceModal isOpen={invoiceModalOpen} onClose={() => { setInvoiceModalOpen(false); setEditingInvoice(null) }} onSave={handleSaveInvoice} invoice={editingInvoice} />

        <ConfirmModal isOpen={!!deletingContact} onClose={() => setDeletingContact(null)} onConfirm={confirmDeleteContact} title="⚠️ Eliminar Contacto" message={`¿Eliminar al contacto "${deletingContact?.nombre}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

        <ConfirmModal isOpen={!!deletingInvoice} onClose={() => setDeletingInvoice(null)} onConfirm={confirmDeleteInvoice} title="⚠️ Eliminar Factura" message={`¿Eliminar la factura "${deletingInvoice?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

      </div>
    </div>
  )
}
