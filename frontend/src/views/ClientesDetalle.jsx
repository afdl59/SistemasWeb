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
import ContractModal from '../components/ContractModal'
import PaymentModal from '../components/PaymentModal'
import MeetingModal from '../components/MeetingModal'
import FeedbackModal from '../components/FeedbackModal'
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
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [editingFeedback, setEditingFeedback] = useState(null)
  const [deletingFeedback, setDeletingFeedback] = useState(null)
  const [ticketsModalOpen, setTicketsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [deletingTicket, setDeletingTicket] = useState(null)
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false)
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
      // ensure payments exist (sample data) for demo if absent
      if (!found.payments || !Array.isArray(found.payments) || found.payments.length === 0) {
        found.payments = [
          { id: Date.now() + 11, fechaPago: '10/01/2024', importe: 800.00, metodo: 'Transferencia', factura: 'FAC-2024-001', fechaLimite: '05/01/2024', retraso: 5, estado: 'Retrasado' },
          { id: Date.now() + 12, fechaPago: '01/02/2024', importe: 1200.00, metodo: 'Tarjeta', factura: 'FAC-2024-010', fechaLimite: '01/02/2024', retraso: 0, estado: 'Pagado' },
          { id: Date.now() + 13, fechaPago: null, importe: 950.00, metodo: 'Domiciliación', factura: 'FAC-2023-050', fechaLimite: '20/12/2023', retraso: 60, estado: 'Impagado' }
        ]
      }
      // ensure meetings exist (sample data) for demo if absent
      if (!found.meetings || !Array.isArray(found.meetings) || found.meetings.length === 0) {
        found.meetings = [
          { id: Date.now() + 21, fecha: '15/06/2024 - 10:00', tipo: 'Videollamada', descripcion: 'Presentación de propuesta 2024', participantes: 'Ana López (interna), Jorge Ruiz (cliente)', estado: 'Programada' },
          { id: Date.now() + 22, fecha: '03/05/2024 - 16:30', tipo: 'Reunión presencial', descripcion: 'Cierre del contrato anual', participantes: 'Carlos Pérez (interno), Marta Gómez (cliente)', estado: 'Realizada' },
          { id: Date.now() + 23, fecha: '22/04/2024 - 12:00', tipo: 'Llamada', descripcion: 'Seguimiento trimestral', participantes: 'Ana López', estado: 'Cancelada' }
        ]
      }
      // ensure feedbacks exist (sample data) for demo if absent
      if (!found.feedbacks || !Array.isArray(found.feedbacks) || found.feedbacks.length === 0) {
        found.feedbacks = [
          { id: Date.now() + 31, fecha: '10/03/2024', origen: 'Encuesta', valor: 9, categoria: 'Atención', comentario: 'Muy buena atención y rapidez en la respuesta.', nivel: 'Alto' },
          { id: Date.now() + 32, fecha: '25/02/2024', origen: 'Reunión', valor: 6, categoria: 'Calidad del servicio', comentario: 'El servicio fue correcto, pero hubo retrasos en la entrega.', nivel: 'Medio' },
          { id: Date.now() + 33, fecha: '05/01/2024', origen: 'Ticket resuelto', valor: 3, categoria: 'Tiempo de respuesta', comentario: 'La incidencia tardó demasiado en resolverse.', nivel: 'Bajo' }
        ]
      }
      // ensure tickets/incidencias exist (sample data) for demo if absent
      if (!found.tickets || !Array.isArray(found.tickets) || found.tickets.length === 0) {
        found.tickets = [
          { id: Date.now() + 41, numero: 'TCK-2024-001', fecha: '12/04/2024', prioridad: 'Alta', tipo: 'Soporte técnico', descripcion: 'El cliente no puede acceder a la plataforma.', estado: 'En progreso', responsable: 'Ana López' },
          { id: Date.now() + 42, numero: 'TCK-2024-014', fecha: '28/03/2024', prioridad: 'Media', tipo: 'Facturación', descripcion: 'Consulta sobre importe incorrecto en factura.', estado: 'Abierta', responsable: 'Carlos Pérez' },
          { id: Date.now() + 43, numero: 'TCK-2024-009', fecha: '15/02/2024', prioridad: 'Baja', tipo: 'Logística', descripcion: 'Retraso en entrega de documentos.', estado: 'Resuelta', responsable: 'Marta Gómez' }
        ]
      }
      // ensure preferences exist (sample data) for demo if absent
      if (!found.preferences || typeof found.preferences !== 'object') {
        found.preferences = {
          metodoContacto: 'Email',
          franjaHoraria: 'Tarde (16:00 – 20:00)',
          idioma: 'Español',
          frecuenciaContacto: 'Mensual',
          nivelFormalidad: 'Neutral',
          notas: 'Prefiere que las reuniones se confirmen con 24h de antelación.'
        }
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
    if (tab === 'contratos') setActiveTab('contratos')
    if (tab === 'pagos') setActiveTab('pagos')
    if (tab === 'reuniones') setActiveTab('reuniones')
    if (tab === 'feedback') setActiveTab('feedback')
    if (tab === 'incidencias') setActiveTab('incidencias')
    if (tab === 'preferencias' || tab === 'preferences') setActiveTab('preferencias')
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

  // Contracts handlers
  const handleAddContract = () => { setEditingContract(null); setContractModalOpen(true) }
  const handleEditContract = (ct) => { setEditingContract(ct); setContractModalOpen(true) }
  const handleSaveContract = (ctData) => {
    const next = { ...cliente }
    next.contracts = next.contracts || []
    const exists = next.contracts.find(x => x.id === ctData.id)
    if (exists) next.contracts = next.contracts.map(x => x.id === ctData.id ? ctData : x)
    else next.contracts = [ctData, ...next.contracts]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteContract = (ct) => setDeletingContractItem(ct)
  const confirmDeleteContract = () => {
    if (!deletingContractItem) return
    const next = { ...cliente }
    next.contracts = (next.contracts || []).filter(x => x.id !== deletingContractItem.id)
    setCliente(next)
    saveCliente(next)
    setDeletingContractItem(null)
  }

  // Payments handlers
  const handleAddPayment = () => { setEditingPayment(null); setPaymentsModalOpen(true) }
  const handleEditPayment = (p) => { setEditingPayment(p); setPaymentsModalOpen(true) }
  const handleSavePayment = (pData) => {
    const next = { ...cliente }
    next.payments = next.payments || []
    const exists = next.payments.find(x => x.id === pData.id)
    if (exists) next.payments = next.payments.map(x => x.id === pData.id ? pData : x)
    else next.payments = [pData, ...next.payments]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeletePayment = (p) => setDeletingPayment(p)
  const confirmDeletePayment = () => {
    if (!deletingPayment) return
    const next = { ...cliente }
    next.payments = (next.payments || []).filter(x => x.id !== deletingPayment.id)
    setCliente(next)
    saveCliente(next)
    setDeletingPayment(null)
  }

  // Meetings handlers
  const handleAddMeeting = () => { setEditingMeeting(null); setMeetingsModalOpen(true) }
  const handleEditMeeting = (m) => { setEditingMeeting(m); setMeetingsModalOpen(true) }
  const handleSaveMeeting = (mData) => {
    const next = { ...cliente }
    next.meetings = next.meetings || []
    const exists = next.meetings.find(x => x.id === mData.id)
    if (exists) next.meetings = next.meetings.map(x => x.id === mData.id ? mData : x)
    else next.meetings = [mData, ...next.meetings]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteMeeting = (m) => setDeletingMeeting(m)
  const confirmDeleteMeeting = () => {
    if (!deletingMeeting) return
    const next = { ...cliente }
    next.meetings = (next.meetings || []).filter(x => x.id !== deletingMeeting.id)
    setCliente(next)
    saveCliente(next)
    setDeletingMeeting(null)
  }

  // Feedback handlers
  const handleAddFeedback = () => { setEditingFeedback(null); setFeedbackModalOpen(true) }
  const handleEditFeedback = (f) => { setEditingFeedback(f); setFeedbackModalOpen(true) }
  const handleSaveFeedback = (fData) => {
    const next = { ...cliente }
    next.feedbacks = next.feedbacks || []
    const exists = next.feedbacks.find(x => x.id === fData.id)
    if (exists) next.feedbacks = next.feedbacks.map(x => x.id === fData.id ? fData : x)
    else next.feedbacks = [fData, ...next.feedbacks]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteFeedback = (f) => setDeletingFeedback(f)
  const confirmDeleteFeedback = () => {
    if (!deletingFeedback) return
    const next = { ...cliente }
    next.feedbacks = (next.feedbacks || []).filter(x => x.id !== deletingFeedback.id)
    setCliente(next)
    saveCliente(next)
    setDeletingFeedback(null)
  }

  // Preferences handlers
  const handleEditPreferences = () => { setPreferencesModalOpen(true); setEditingFeedback(null) }
  const handleSavePreferences = (prefs) => {
    const next = { ...cliente }
    next.preferences = prefs
    setCliente(next)
    saveCliente(next)
  }

  // Tickets / Incidencias handlers
  const handleAddTicket = () => { setEditingTicket(null); setTicketsModalOpen(true) }
  const handleEditTicket = (t) => { setEditingTicket(t); setTicketsModalOpen(true) }
  const handleSaveTicket = (tData) => {
    const next = { ...cliente }
    next.tickets = next.tickets || []
    const exists = next.tickets.find(x => x.id === tData.id)
    if (exists) next.tickets = next.tickets.map(x => x.id === tData.id ? tData : x)
    else next.tickets = [tData, ...next.tickets]
    setCliente(next)
    saveCliente(next)
  }

  const handleDeleteTicket = (t) => setDeletingTicket(t)
  const confirmDeleteTicket = () => {
    if (!deletingTicket) return
    const next = { ...cliente }
    next.tickets = (next.tickets || []).filter(x => x.id !== deletingTicket.id)
    setCliente(next)
    saveCliente(next)
    setDeletingTicket(null)
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
            <button className={`btn ${activeTab === 'contratos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('contratos')}>Contratos</button>
            <button className={`btn ${activeTab === 'pagos' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('pagos')}>Historial de Pagos</button>
            <button className={`btn ${activeTab === 'reuniones' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('reuniones')}>Reuniones</button>
            <button className={`btn ${activeTab === 'feedback' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('feedback')}>Feedback</button>
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

          {activeTab === 'contratos' && (
            <>
              <div className="lineas-header">
                <h1>📑 Contratos de {cliente.nombre}</h1>
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
                <h1>💳 Historial de Pagos de {cliente.nombre}</h1>
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
                <h1>📅 Reuniones de {cliente.nombre}</h1>
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

          {activeTab === 'feedback' && (
            <>
              <div className="lineas-header">
                <h1>🗒️ Feedback y grado de satisfacción de {cliente.nombre}</h1>
                <button className="btn btn-primary" onClick={() => { setEditingFeedback(null); setFeedbackModalOpen(true) }}>Añadir feedback</button>
              </div>

              {/* Resumen de satisfacción */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#2c3e50' }}>
                    {(() => {
                      const vals = (cliente.feedbacks || []).map(f => Number(f.valor)).filter(v => !isNaN(v))
                      if (vals.length === 0) return 'Sin valoraciones'
                      const avg = vals.reduce((a, b) => a + b, 0) / vals.length
                      return `${new Intl.NumberFormat('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(avg)} / 10`
                    })()}
                  </div>
                  <div className="descripcion-text">Satisfacción media</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {(() => {
                    const vals = (cliente.feedbacks || []).map(f => Number(f.valor)).filter(v => !isNaN(v))
                    if (vals.length === 0) return <span className="status-badge" style={{ backgroundColor: '#e9ecef', color: '#495057' }}>Sin datos</span>
                    const avg = vals.reduce((a, b) => a + b, 0) / vals.length
                    if (avg >= 7.5) return <span className="status-badge active">Alto</span>
                    if (avg >= 4) return <span className="status-badge btn-warning">Medio</span>
                    return <span className="status-badge inactive">Bajo</span>
                  })()}
                </div>
              </div>

              <table className="lineas-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Valoración</th>
                    <th>Categoría</th>
                    <th>Comentario breve</th>
                    <th>Nivel</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(cliente.feedbacks || []).map(f => (
                    <tr key={f.id}>
                      <td>{f.fecha}</td>
                      <td>{f.origen}</td>
                      <td>{f.valor}/10</td>
                      <td>{f.categoria}</td>
                      <td className="descripcion-text">{f.comentario}</td>
                      <td>
                        {f.nivel === 'Alto' && <span className="status-badge active">Alto</span>}
                        {f.nivel === 'Medio' && <span className="status-badge btn-warning">Medio</span>}
                        {f.nivel === 'Bajo' && <span className="status-badge inactive">Bajo</span>}
                      </td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                        <button className="btn btn-sm btn-secondary" onClick={() => { setEditingFeedback(f); setFeedbackModalOpen(true) }} title="Editar"><FaEdit /></button>
                        <button className="btn btn-sm btn-danger" onClick={() => setDeletingFeedback(f)} title="Eliminar"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                  {(!cliente.feedbacks || cliente.feedbacks.length === 0) && (
                    <tr><td colSpan={7}>No hay feedback registrado para este cliente.</td></tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {activeTab === 'preferencias' && (
            <>
              <div className="lineas-header">
                <h1>⚙️ Preferencias de {cliente.nombre}</h1>
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
                <h1>⚠️ Incidencias de {cliente.nombre}</h1>
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
        <FeedbackModal isOpen={feedbackModalOpen} onClose={() => { setFeedbackModalOpen(false); setEditingFeedback(null) }} onSave={handleSaveFeedback} feedback={editingFeedback} />
        <TicketModal isOpen={ticketsModalOpen} onClose={() => { setTicketsModalOpen(false); setEditingTicket(null) }} onSave={handleSaveTicket} ticket={editingTicket} />
        <PreferenceModal isOpen={preferencesModalOpen} onClose={() => { setPreferencesModalOpen(false) }} onSave={handleSavePreferences} preferences={cliente.preferences} />

        <ConfirmModal isOpen={!!deletingContact} onClose={() => setDeletingContact(null)} onConfirm={confirmDeleteContact} title="⚠️ Eliminar Contacto" message={`¿Eliminar al contacto "${deletingContact?.nombre}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

        <ConfirmModal isOpen={!!deletingInvoice} onClose={() => setDeletingInvoice(null)} onConfirm={confirmDeleteInvoice} title="⚠️ Eliminar Factura" message={`¿Eliminar la factura "${deletingInvoice?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingContractItem} onClose={() => setDeletingContractItem(null)} onConfirm={confirmDeleteContract} title="⚠️ Eliminar Contrato" message={`¿Eliminar el contrato "${deletingContractItem?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingPayment} onClose={() => setDeletingPayment(null)} onConfirm={confirmDeletePayment} title="⚠️ Eliminar Pago" message={`¿Eliminar el registro de pago?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingMeeting} onClose={() => setDeletingMeeting(null)} onConfirm={confirmDeleteMeeting} title="⚠️ Eliminar Reunión" message={`¿Eliminar la reunión?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingFeedback} onClose={() => setDeletingFeedback(null)} onConfirm={confirmDeleteFeedback} title="⚠️ Eliminar Feedback" message={`¿Eliminar este feedback?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!deletingTicket} onClose={() => setDeletingTicket(null)} onConfirm={confirmDeleteTicket} title="⚠️ Eliminar Incidencia" message={`¿Eliminar la incidencia?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />

      </div>
    </div>
  )
}
