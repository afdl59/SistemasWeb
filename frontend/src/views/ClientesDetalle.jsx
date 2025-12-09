import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import ContactModal from '../components/ContactModal'
import { ConfirmModal } from '../components/Modal'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import './LineasNegocio.css'
import * as clienteService from '../services/clienteService'
import { useLocation } from 'react-router-dom'
import InvoiceModal from '../components/InvoiceModal'
import ContractModal from '../components/ContractModal'
import PaymentModal from '../components/PaymentModal'
import MeetingModal from '../components/MeetingModal'
import TicketModal from '../components/TicketModal'
import PreferenceModal from '../components/PreferenceModal'
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
  const [contractModalOpen, setContractModalOpen] = useState(false)
  const [editingContract, setEditingContract] = useState(null)
  const [deletingContractItem, setDeletingContractItem] = useState(null)
  const [paymentsModalOpen, setPaymentsModalOpen] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)
  const [deletingPayment, setDeletingPayment] = useState(null)
  const [meetingsModalOpen, setMeetingsModalOpen] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState(null)
  const [deletingMeeting, setDeletingMeeting] = useState(null)
  const [ticketsModalOpen, setTicketsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [deletingTicket, setDeletingTicket] = useState(null)
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false)
  const location = useLocation()

  const loadCliente = async () => {
    try {
      const data = await clienteService.getClienteById(id)
      setCliente(data)
    } catch (err) {
      console.error('Error al cargar cliente:', err)
      navigate('/Clientes')
    }
  }

  useEffect(() => {
    loadCliente()
  }, [id])

  useEffect(() => {
    const qp = new URLSearchParams(location.search)
    const tab = qp.get('tab')
    if (tab === 'facturas') setActiveTab('facturas')
    if (tab === 'contratos') setActiveTab('contratos')
    if (tab === 'pagos') setActiveTab('pagos')
    if (tab === 'reuniones') setActiveTab('reuniones')
    if (tab === 'incidencias') setActiveTab('incidencias')
    if (tab === 'preferencias' || tab === 'preferences') setActiveTab('preferencias')
  }, [location.search])



  const handleAddContact = () => { setEditingContact(null); setShowContactModal(true) }
  const handleEditContact = (c) => { setEditingContact(c); setShowContactModal(true) }
  const handleSaveContact = async (cData) => {
    try {
      if (editingContact) {
        await clienteService.updateContacto(id, editingContact.id, cData)
      } else {
        await clienteService.createContacto(id, cData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar contacto:', err)
    }
  }

  const handleDeleteContact = (c) => setDeletingContact(c)
  const confirmDeleteContact = async () => {
    if (!deletingContact) return
    try {
      await clienteService.deleteContacto(id, deletingContact.id)
      setDeletingContact(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar contacto:', err)
    }
  }

  // Invoices handlers
  const handleAddInvoice = () => { setEditingInvoice(null); setInvoiceModalOpen(true) }
  const handleEditInvoice = (inv) => { setEditingInvoice(inv); setInvoiceModalOpen(true) }
  const handleSaveInvoice = async (invData) => {
    try {
      if (editingInvoice) {
        await clienteService.updateFactura(id, editingInvoice.id, invData)
      } else {
        await clienteService.createFactura(id, invData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar factura:', err)
    }
  }

  const handleDeleteInvoice = (inv) => setDeletingInvoice(inv)
  const confirmDeleteInvoice = async () => {
    if (!deletingInvoice) return
    try {
      await clienteService.deleteFactura(id, deletingInvoice.id)
      setDeletingInvoice(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar factura:', err)
    }
  }

  // Contracts handlers
  const handleAddContract = () => { setEditingContract(null); setContractModalOpen(true) }
  const handleEditContract = (ct) => { setEditingContract(ct); setContractModalOpen(true) }
  const handleSaveContract = async (ctData) => {
    try {
      if (editingContract) {
        await clienteService.updateContrato(id, editingContract.id, ctData)
      } else {
        await clienteService.createContrato(id, ctData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar contrato:', err)
    }
  }

  const handleDeleteContract = (ct) => setDeletingContractItem(ct)
  const confirmDeleteContract = async () => {
    if (!deletingContractItem) return
    try {
      await clienteService.deleteContrato(id, deletingContractItem.id)
      setDeletingContractItem(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar contrato:', err)
    }
  }

  // Payments handlers
  const handleAddPayment = () => { setEditingPayment(null); setPaymentsModalOpen(true) }
  const handleEditPayment = (p) => { setEditingPayment(p); setPaymentsModalOpen(true) }
  const handleSavePayment = async (pData) => {
    try {
      if (editingPayment) {
        await clienteService.updatePago(id, editingPayment.id, pData)
      } else {
        await clienteService.createPago(id, pData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar pago:', err)
    }
  }

  const handleDeletePayment = (p) => setDeletingPayment(p)
  const confirmDeletePayment = async () => {
    if (!deletingPayment) return
    try {
      await clienteService.deletePago(id, deletingPayment.id)
      setDeletingPayment(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar pago:', err)
    }
  }

  // Meetings handlers
  const handleAddMeeting = () => { setEditingMeeting(null); setMeetingsModalOpen(true) }
  const handleEditMeeting = (m) => { setEditingMeeting(m); setMeetingsModalOpen(true) }
  const handleSaveMeeting = async (mData) => {
    try {
      if (editingMeeting) {
        await clienteService.updateReunion(id, editingMeeting.id, mData)
      } else {
        await clienteService.createReunion(id, mData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar reunión:', err)
    }
  }

  const handleDeleteMeeting = (m) => setDeletingMeeting(m)
  const confirmDeleteMeeting = async () => {
    if (!deletingMeeting) return
    try {
      await clienteService.deleteReunion(id, deletingMeeting.id)
      setDeletingMeeting(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar reunión:', err)
    }
  }

  // Preferences handlers
  const handleEditPreferences = () => { setPreferencesModalOpen(true) }
  const handleSavePreferences = async (prefs) => {
    try {
      await clienteService.savePreferencias(id, prefs)
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar preferencias:', err)
    }
  }

  // Tickets / Incidencias handlers
  const handleAddTicket = () => { setEditingTicket(null); setTicketsModalOpen(true) }
  const handleEditTicket = (t) => { setEditingTicket(t); setTicketsModalOpen(true) }
  const handleSaveTicket = async (tData) => {
    try {
      if (editingTicket) {
        await clienteService.updateTicket(id, editingTicket.id, tData)
      } else {
        await clienteService.createTicket(id, tData)
      }
      await loadCliente()
    } catch (err) {
      console.error('Error al guardar ticket:', err)
    }
  }

  const handleDeleteTicket = (t) => setDeletingTicket(t)
  const confirmDeleteTicket = async () => {
    if (!deletingTicket) return
    try {
      await clienteService.deleteTicket(id, deletingTicket.id)
      setDeletingTicket(null)
      await loadCliente()
    } catch (err) {
      console.error('Error al eliminar ticket:', err)
    }
  }

  if (!cliente) return null

  return (
    <div className="lineas-page">
      <SideMenu />
      <div className="lineas-table-container">
        <div className="lineas-header">
          <h1>{cliente.nombre}</h1>
          <div>
            <button className="btn btn-primary" onClick={() => setEditing(true)}><FaEdit /> Editar</button>
            <button className="btn" onClick={() => navigate('/Clientes')}>Volver</button>
          </div>
        </div>

        {/* Resumen de secciones (navegación rápida) */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
          <strong style={{ color: '#495057' }}>Secciones:</strong>
          <button className={`btn btn-sm ${activeTab === 'datos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('datos')}>Datos</button>
          <button className={`btn btn-sm ${activeTab === 'facturas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('facturas')}>Facturas <span className="status-badge" style={{ marginLeft: 8 }}>{(cliente.invoices || []).length}</span></button>
          <button className={`btn btn-sm ${activeTab === 'contratos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('contratos')}>Contratos <span className="status-badge" style={{ marginLeft: 8 }}>{(cliente.contracts || []).length}</span></button>
          <button className={`btn btn-sm ${activeTab === 'pagos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('pagos')}>Pagos <span className="status-badge" style={{ marginLeft: 8 }}>{(cliente.payments || []).length}</span></button>
          <button className={`btn btn-sm ${activeTab === 'reuniones' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('reuniones')}>Reuniones <span className="status-badge" style={{ marginLeft: 8 }}>{(cliente.meetings || []).length}</span></button>
          <button className={`btn btn-sm ${activeTab === 'preferencias' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('preferencias')}>Preferencias</button>
          <button className={`btn btn-sm ${activeTab === 'incidencias' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('incidencias')}>Incidencias <span className="status-badge" style={{ marginLeft: 8 }}>{(cliente.tickets || []).length}</span></button>
          <button className={`btn btn-sm`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Volver arriba</button>
        </div>

        <div className="client-detail">
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button className={`btn ${activeTab === 'datos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('datos')}>Datos del cliente</button>
            <button className={`btn ${activeTab === 'facturas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('facturas')}>Facturas</button>
            <button className={`btn ${activeTab === 'contratos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('contratos')}>Contratos</button>
            <button className={`btn ${activeTab === 'pagos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('pagos')}>Historial de Pagos</button>
            <button className={`btn ${activeTab === 'reuniones' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('reuniones')}>Reuniones</button>
            <button className={`btn ${activeTab === 'preferencias' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('preferencias')}>Preferencias</button>
            <button className={`btn ${activeTab === 'incidencias' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('incidencias')}>Incidencias</button>
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
                <h1>Facturas de {cliente.nombre}</h1>
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

          {activeTab === 'contratos' && (
            <>
              <div className="lineas-header">
                <h1>Contratos de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={handleAddContract}>Crear Contrato</button>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>Número de contrato</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de fin</th>
                    <th>Importe</th>
                    <th>Tipo de contrato</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.contracts || []).map(ct => (
                    <tr key={ct.id}>
                      <td className="linea-name">{ct.numero}</td>
                      <td>{ct.inicio}</td>
                      <td>{ct.fin}</td>
                      <td>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(ct.importe)}</td>
                      <td>{ct.tipo}</td>
                      <td>
                        {ct.estado === 'Vigente' && <span className="status-badge active">Vigente</span>}
                        {ct.estado === 'Próximo a vencer' && <span className="status-badge btn-warning">Próximo a vencer</span>}
                        {ct.estado === 'Vencido' && <span className="status-badge inactive">Vencido</span>}
                        {ct.estado === 'Cancelado' && <span className="status-badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>Cancelado</span>}
                      </td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => handleEditContract(ct)} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteContract(ct)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.contracts || cliente.contracts.length === 0) && (
                    <tr><td colSpan={7}>No hay contratos para este cliente.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'pagos' && (
            <>
              <div className="lineas-header">
                <h1>Historial de Pagos de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={() => { setEditingPayment(null); setPaymentsModalOpen(true) }}>Registrar Pago</button>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>Fecha del pago</th>
                    <th>Importe</th>
                    <th>Método de pago</th>
                    <th>Factura asociada</th>
                    <th>Fecha límite de pago</th>
                    <th>Retraso (días)</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.payments || []).map(p => (
                    <tr key={p.id}>
                      <td>{p.fechaPago || '—'}</td>
                      <td>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.importe || 0)}</td>
                      <td>{p.metodo}</td>
                      <td className="linea-name">{p.factura || '—'}</td>
                      <td>{p.fechaLimite || '—'}</td>
                      <td>{p.retraso ?? 0}</td>
                      <td>
                        {p.estado === 'Pagado' && <span className="status-badge active">Pagado</span>}
                        {p.estado === 'Retrasado' && <span className="status-badge btn-warning">Retrasado</span>}
                        {p.estado === 'Impagado' && <span className="status-badge inactive">Impagado</span>}
                      </td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setEditingPayment(p); setPaymentsModalOpen(true) }} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => setDeletingPayment(p)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.payments || cliente.payments.length === 0) && (
                    <>
                      <tr>
                        <td colSpan={8}>No hay pagos registrados para este cliente.</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'reuniones' && (
            <>
              <div className="lineas-header">
                <h1>Reuniones de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={() => { setEditingMeeting(null); setMeetingsModalOpen(true) }}>Programar Reunión</button>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Descripción breve</th>
                    <th>Participantes</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.meetings || []).map(m => (
                    <tr key={m.id}>
                      <td>{m.fecha || '—'}</td>
                      <td>{m.tipo}</td>
                      <td className="descripcion-text">{m.descripcion}</td>
                      <td className="descripcion-text">{m.participantes}</td>
                      <td>
                        {m.estado === 'Programada' && <span className="status-badge" style={{ backgroundColor: '#cfe2ff', color: '#084298' }}>Programada</span>}
                        {m.estado === 'Realizada' && <span className="status-badge active">Realizada</span>}
                        {m.estado === 'Cancelada' && <span className="status-badge inactive">Cancelada</span>}
                        {m.estado === 'Reprogramada' && <span className="status-badge btn-warning">Reprogramada</span>}
                      </td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setEditingMeeting(m); setMeetingsModalOpen(true) }} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => setDeletingMeeting(m)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.meetings || cliente.meetings.length === 0) && (
                    <tr><td colSpan={6}>No hay reuniones registradas para este cliente.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'preferencias' && (
            <>
              <div className="lineas-header">
                <h1>Preferencias de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={() => setPreferencesModalOpen(true)}>Editar preferencias</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Método de contacto preferido</h3>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Email','Teléfono','WhatsApp','Videollamada'].map(m => (
                      <span key={m} className={`status-badge ${cliente.preferences?.metodoContacto === m ? 'active' : ''}`} style={cliente.preferences?.metodoContacto === m ? {} : { backgroundColor: '#e9ecef', color: '#495057' }}>{m}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Franja horaria preferida</h3>
                  <div style={{ marginTop: 8 }} className="descripcion-text">{cliente.preferences?.franjaHoraria}</div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Idioma preferido</h3>
                  <div style={{ marginTop: 8 }}><span className="status-badge active">{cliente.preferences?.idioma}</span></div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Frecuencia de contacto</h3>
                  <div style={{ marginTop: 8 }} className="descripcion-text">{cliente.preferences?.frecuenciaContacto}</div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Nivel de formalidad</h3>
                  <div style={{ marginTop: 8 }}><span className="status-badge btn-warning">{cliente.preferences?.nivelFormalidad}</span></div>
                </div>

                <div style={{ background: 'white', padding: 16, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ margin: 0 }}>Notas adicionales</h3>
                  <div style={{ marginTop: 8 }} className="descripcion-text">{cliente.preferences?.notas}</div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'incidencias' && (
            <>
              <div className="lineas-header">
                <h1>Incidencias de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={() => { setEditingTicket(null); setTicketsModalOpen(true) }}>Crear Incidencia</button>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>ID / Nº de Ticket</th>
                    <th>Fecha de creación</th>
                    <th>Prioridad</th>
                    <th>Tipo de incidencia</th>
                    <th>Descripción breve</th>
                    <th>Estado</th>
                    <th>Responsable</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.tickets || []).map(t => (
                    <tr key={t.id}>
                      <td className="linea-name">{t.numero}</td>
                      <td>{t.fecha}</td>
                      <td>
                        {t.prioridad === 'Alta' && <span className="status-badge inactive" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>Alta</span>}
                        {t.prioridad === 'Media' && <span className="status-badge btn-warning">Media</span>}
                        {t.prioridad === 'Baja' && <span className="status-badge active">Baja</span>}
                      </td>
                      <td>{t.tipo}</td>
                      <td className="descripcion-text">{t.descripcion}</td>
                      <td>
                        {t.estado === 'Abierta' && <span className="status-badge" style={{ backgroundColor: '#cfe2ff', color: '#084298' }}>Abierta</span>}
                        {t.estado === 'En progreso' && <span className="status-badge btn-warning">En progreso</span>}
                        {t.estado === 'Resuelta' && <span className="status-badge active">Resuelta</span>}
                        {t.estado === 'Cerrada' && <span className="status-badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>Cerrada</span>}
                      </td>
                      <td>{t.responsable}</td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setEditingTicket(t); setTicketsModalOpen(true) }} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => setDeletingTicket(t)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.tickets || cliente.tickets.length === 0) && (
                    <tr><td colSpan={8}>No hay incidencias registradas para este cliente.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>

        <ClienteModal isOpen={editing} onClose={() => setEditing(false)} onSave={(d) => { saveCliente(d); setEditing(false); }} cliente={cliente} />

        <ContactModal isOpen={showContactModal} onClose={() => { setShowContactModal(false); setEditingContact(null) }} onSave={handleSaveContact} contact={editingContact} />

        <InvoiceModal isOpen={invoiceModalOpen} onClose={() => { setInvoiceModalOpen(false); setEditingInvoice(null) }} onSave={handleSaveInvoice} invoice={editingInvoice} />
        <ContractModal isOpen={contractModalOpen} onClose={() => { setContractModalOpen(false); setEditingContract(null) }} onSave={handleSaveContract} contract={editingContract} />
        <PaymentModal isOpen={paymentsModalOpen} onClose={() => { setPaymentsModalOpen(false); setEditingPayment(null) }} onSave={handleSavePayment} payment={editingPayment} />
        <MeetingModal isOpen={meetingsModalOpen} onClose={() => { setMeetingsModalOpen(false); setEditingMeeting(null) }} onSave={handleSaveMeeting} meeting={editingMeeting} />
        <TicketModal isOpen={ticketsModalOpen} onClose={() => { setTicketsModalOpen(false); setEditingTicket(null) }} onSave={handleSaveTicket} ticket={editingTicket} />
        <PreferenceModal isOpen={preferencesModalOpen} onClose={() => { setPreferencesModalOpen(false) }} onSave={handleSavePreferences} preferences={cliente.preferences} />

        <ConfirmModal isOpen={!!deletingContact} onClose={() => setDeletingContact(null)} onConfirm={confirmDeleteContact} title="Eliminar Contacto" message={`¿Eliminar al contacto "${deletingContact?.nombre}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

        <ConfirmModal isOpen={!!deletingInvoice} onClose={() => setDeletingInvoice(null)} onConfirm={confirmDeleteInvoice} title="Eliminar Factura" message={`¿Eliminar la factura "${deletingInvoice?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingContractItem} onClose={() => setDeletingContractItem(null)} onConfirm={confirmDeleteContract} title="Eliminar Contrato" message={`¿Eliminar el contrato "${deletingContractItem?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingPayment} onClose={() => setDeletingPayment(null)} onConfirm={confirmDeletePayment} title="Eliminar Pago" message={`¿Eliminar el registro de pago?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingMeeting} onClose={() => setDeletingMeeting(null)} onConfirm={confirmDeleteMeeting} title="Eliminar Reunión" message={`¿Eliminar la reunión?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingTicket} onClose={() => setDeletingTicket(null)} onConfirm={confirmDeleteTicket} title="Eliminar Incidencia" message={`¿Eliminar la incidencia?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

      </div>
    </div>
  )
}
