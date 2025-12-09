import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaTrash, FaEye, FaFileContract } from 'react-icons/fa'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import * as clienteService from '../services/clienteService'
import SideMenu from '../components/SideMenu'
import ClienteModal from '../components/ClienteModal'
import ContactModal from '../components/ContactModal'
import InvoiceModal from '../components/InvoiceModal'
import ContractModal from '../components/ContractModal'
import PaymentModal from '../components/PaymentModal'
import MeetingModal from '../components/MeetingModal'
import TicketModal from '../components/TicketModal'
import PreferenceModal from '../components/PreferenceModal'
import { ConfirmModal } from '../components/Modal'
import './Clientes.css'

export default function Clientes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [deletingCliente, setDeletingCliente] = useState(null)
  const [togglingCliente, setTogglingCliente] = useState(null)
  
  // Estados para vista detalle
  const [clienteDetalle, setClienteDetalle] = useState(null)
  const [activeTab, setActiveTab] = useState('datos')
  const [showContactModal, setShowContactModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [deletingContact, setDeletingContact] = useState(null)
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

  const loadClientes = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await clienteService.getAllClientes()
      
      // Ordenar: activos primero (alfabéticamente), luego inactivos (alfabéticamente)
      const sorted = data.sort((a, b) => {
        // Si uno está activo y el otro no, el activo va primero
        if (a.activo && !b.activo) return -1
        if (!a.activo && b.activo) return 1
        
        // Si ambos tienen el mismo estado, ordenar alfabéticamente por nombre
        return a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
      })
      
      setClientes(sorted)
    } catch (err) {
      console.error('Error al cargar clientes:', err)
      setError('Error al cargar los clientes')
    } finally {
      setLoading(false)
    }
  }

  const loadClienteDetalle = async (clienteId) => {
    try {
      const data = await clienteService.getClienteById(clienteId)
      setClienteDetalle(data)
    } catch (err) {
      console.error('Error al cargar cliente:', err)
      navigate('/Clientes')
    }
  }

  useEffect(() => {
    if (id) {
      loadClienteDetalle(id)
    } else {
      loadClientes()
    }
  }, [id])

  useEffect(() => {
    if (id) {
      const qp = new URLSearchParams(location.search)
      const tab = qp.get('tab')
      if (tab === 'facturas') setActiveTab('facturas')
      if (tab === 'contratos') setActiveTab('contratos')
      if (tab === 'pagos') setActiveTab('pagos')
      if (tab === 'reuniones') setActiveTab('reuniones')
      if (tab === 'incidencias') setActiveTab('incidencias')
      if (tab === 'preferencias' || tab === 'preferences') setActiveTab('preferencias')
    }
  }, [location.search, id])

  // ⬇️ Usamos el navigate ya declarado arriba
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

  // Handlers de contactos
  const handleAddContact = () => { setEditingContact(null); setShowContactModal(true) }
  const handleEditContact = (c) => { setEditingContact(c); setShowContactModal(true) }
  const handleSaveContact = async (cData) => {
    try {
      if (editingContact) {
        await clienteService.updateContacto(id, editingContact.id, cData)
      } else {
        await clienteService.createContacto(id, cData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar contacto:', err)
    }
  }

  // Handlers de facturas
  const handleAddInvoice = () => { setEditingInvoice(null); setInvoiceModalOpen(true) }
  const handleEditInvoice = (inv) => { setEditingInvoice(inv); setInvoiceModalOpen(true) }
  const handleSaveInvoice = async (invData) => {
    try {
      if (editingInvoice) {
        await clienteService.updateFactura(id, editingInvoice.id, invData)
      } else {
        await clienteService.createFactura(id, invData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar factura:', err)
    }
  }

  // Handlers de contratos
  const handleAddContract = () => { setEditingContract(null); setContractModalOpen(true) }
  const handleEditContract = (ct) => { setEditingContract(ct); setContractModalOpen(true) }
  const handleSaveContract = async (ctData) => {
    try {
      if (editingContract) {
        await clienteService.updateContrato(id, editingContract.id, ctData)
      } else {
        await clienteService.createContrato(id, ctData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar contrato:', err)
    }
  }

  // Handlers de pagos
  const handleAddPayment = () => { setEditingPayment(null); setPaymentsModalOpen(true) }
  const handleEditPayment = (p) => { setEditingPayment(p); setPaymentsModalOpen(true) }
  const handleSavePayment = async (pData) => {
    try {
      if (editingPayment) {
        await clienteService.updatePago(id, editingPayment.id, pData)
      } else {
        await clienteService.createPago(id, pData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar pago:', err)
    }
  }

  // Handlers de reuniones
  const handleAddMeeting = () => { setEditingMeeting(null); setMeetingsModalOpen(true) }
  const handleEditMeeting = (m) => { setEditingMeeting(m); setMeetingsModalOpen(true) }
  const handleSaveMeeting = async (mData) => {
    try {
      if (editingMeeting) {
        await clienteService.updateReunion(id, editingMeeting.id, mData)
      } else {
        await clienteService.createReunion(id, mData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar reunión:', err)
    }
  }

  // Handlers de preferencias
  const handleEditPreferences = () => { setPreferencesModalOpen(true) }
  const handleSavePreferences = async (prefs) => {
    try {
      await clienteService.savePreferencias(id, prefs)
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al guardar preferencias:', err)
    }
  }

  // Handlers de tickets
  const handleAddTicket = () => { setEditingTicket(null); setTicketsModalOpen(true) }
  const handleEditTicket = (t) => { setEditingTicket(t); setTicketsModalOpen(true) }
  const handleSaveTicket = async (tData) => {
    try {
      if (editingTicket) {
        await clienteService.updateTicket(id, editingTicket.id, tData)
      } else {
        await clienteService.createTicket(id, tData)
      }
      await loadClienteDetalle(id)
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
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al eliminar ticket:', err)
    }
  }

  const saveClienteDetalle = async (clienteData) => {
    try {
      await clienteService.updateCliente(id, clienteData)
      setEditingCliente(null)
      await loadClienteDetalle(id)
    } catch (err) {
      console.error('Error al actualizar cliente:', err)
    }
  }

  if (loading) return <div className="loading">Cargando clientes...</div>

  // Vista detalle de cliente
  if (id && clienteDetalle) {
    return (
      <div className="clientes-page">
        <SideMenu />
        <div className="clientes-content">
          <div className="clientes-header">
            <h1>{clienteDetalle.nombre}</h1>
            <div className="clientes-header-actions">
              <button className="btn btn-primary" onClick={() => setEditingCliente(clienteDetalle)}><FaEdit /> Editar</button>
              <button className="btn btn-secondary" onClick={() => navigate('/Clientes')}>Volver</button>
            </div>
          </div>

          {/* Navegación de tabs */}
          <div className="cliente-tabs-small">
            <strong>Secciones:</strong>
            <button className={`btn btn-sm ${activeTab === 'datos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('datos')}>Datos</button>
            <button className={`btn btn-sm ${activeTab === 'facturas' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('facturas')}>Facturas ({(clienteDetalle.invoices || []).length})</button>
            <button className={`btn btn-sm ${activeTab === 'contratos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('contratos')}>Contratos ({(clienteDetalle.contracts || []).length})</button>
            <button className={`btn btn-sm ${activeTab === 'pagos' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('pagos')}>Pagos ({(clienteDetalle.payments || []).length})</button>
            <button className={`btn btn-sm ${activeTab === 'reuniones' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('reuniones')}>Reuniones ({(clienteDetalle.meetings || []).length})</button>
            <button className={`btn btn-sm ${activeTab === 'incidencias' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('incidencias')}>Incidencias ({(clienteDetalle.tickets || []).length})</button>
          </div>

          <div className="cliente-detalle">
            {activeTab === 'datos' && (
              <>
                <table className="clientes-table">
                  <tbody>
                    <tr><th>Nombre</th><td>{clienteDetalle.nombre}</td></tr>
                    <tr><th>CIF/NIF</th><td>{clienteDetalle.cif}</td></tr>
                    <tr><th>Email</th><td><a href={`mailto:${clienteDetalle.email}`}>{clienteDetalle.email}</a></td></tr>
                    <tr><th>Teléfono</th><td><a href={`tel:${clienteDetalle.telefono}`}>{clienteDetalle.telefono}</a></td></tr>
                    <tr><th>Línea de Negocio</th><td>{clienteDetalle.linea}</td></tr>
                    <tr><th>Estado</th><td><span className={`status-badge ${clienteDetalle.activo ? 'active' : 'inactive'}`}>{clienteDetalle.activo ? 'Activo' : 'Inactivo'}</span></td></tr>
                  </tbody>
                </table>

                <div style={{ marginTop: 18 }}>
                  <h3>Contactos</h3>
                  <div style={{ marginBottom: 8 }}>
                    <button className="btn btn-primary" onClick={handleAddContact}><FaPlus /> Nuevo Contacto</button>
                  </div>
                  <table className="clientes-table">
                    <thead>
                      <tr><th>Nombre</th><th>Cargo</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                      {(clienteDetalle.contacts || []).map(c => (
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
                      {(!clienteDetalle.contacts || clienteDetalle.contacts.length === 0) && (
                        <tr><td colSpan={5}>No hay contactos para este cliente.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'facturas' && (
              <>
                <div className="clientes-header">
                  <h1>Facturas de {clienteDetalle.nombre}</h1>
                  <button className="btn btn-primary" onClick={handleAddInvoice}>Crear Factura</button>
                </div>

                <table className="clientes-table">
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
                    {(clienteDetalle.invoices || []).map(inv => (
                      <tr key={inv.id}>
                        <td className="cliente-name">{inv.numero}</td>
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
                    {(!clienteDetalle.invoices || clienteDetalle.invoices.length === 0) && (
                      <tr><td colSpan={6}>No hay facturas para este cliente.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'contratos' && (
              <>
                <div className="clientes-header">
                  <h1>Contratos de {clienteDetalle.nombre}</h1>
                  <button className="btn btn-primary" onClick={handleAddContract}>Crear Contrato</button>
                </div>

                <table className="clientes-table">
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
                    {(clienteDetalle.contracts || []).map(ct => (
                      <tr key={ct.id}>
                        <td className="cliente-name">{ct.numero}</td>
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
                    {(!clienteDetalle.contracts || clienteDetalle.contracts.length === 0) && (
                      <tr><td colSpan={7}>No hay contratos para este cliente.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'pagos' && (
              <>
                <div className="clientes-header">
                  <h1>Historial de Pagos de {clienteDetalle.nombre}</h1>
                  <button className="btn btn-primary" onClick={handleAddPayment}>Registrar Pago</button>
                </div>

                <table className="clientes-table">
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
                    {(clienteDetalle.payments || []).map(p => (
                      <tr key={p.id}>
                        <td>{p.fechaPago || '—'}</td>
                        <td>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(p.importe || 0)}</td>
                        <td>{p.metodo}</td>
                        <td className="cliente-name">{p.factura || '—'}</td>
                        <td>{p.fechaLimite || '—'}</td>
                        <td>{p.retraso ?? 0}</td>
                        <td>
                          {p.estado === 'Pagado' && <span className="status-badge active">Pagado</span>}
                          {p.estado === 'Retrasado' && <span className="status-badge btn-warning">Retrasado</span>}
                          {p.estado === 'Impagado' && <span className="status-badge inactive">Impagado</span>}
                        </td>
                        <td className="actions-cell">
                          <button className="btn btn-sm btn-secondary" title="Ver"><FaEye /></button>
                          <button className="btn btn-sm btn-secondary" onClick={() => handleEditPayment(p)} title="Editar"><FaEdit /></button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeletePayment(p)} title="Eliminar"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                    {(!clienteDetalle.payments || clienteDetalle.payments.length === 0) && (
                      <tr><td colSpan={8}>No hay pagos registrados para este cliente.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'reuniones' && (
              <>
                <div className="clientes-header">
                  <h1>Reuniones de {clienteDetalle.nombre}</h1>
                  <button className="btn btn-primary" onClick={handleAddMeeting}>Programar Reunión</button>
                </div>

                <table className="clientes-table">
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
                    {(clienteDetalle.meetings || []).map(m => (
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
                          <button className="btn btn-sm btn-secondary" onClick={() => handleEditMeeting(m)} title="Editar"><FaEdit /></button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteMeeting(m)} title="Eliminar"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                    {(!clienteDetalle.meetings || clienteDetalle.meetings.length === 0) && (
                      <tr><td colSpan={6}>No hay reuniones registradas para este cliente.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}

            {activeTab === 'incidencias' && (
              <>
                <div className="clientes-header">
                  <h1>Incidencias de {clienteDetalle.nombre}</h1>
                  <button className="btn btn-primary" onClick={handleAddTicket}>Crear Incidencia</button>
                </div>

                <table className="clientes-table">
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
                    {(clienteDetalle.tickets || []).map(t => (
                      <tr key={t.id}>
                        <td className="cliente-name">{t.numero}</td>
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
                          <button className="btn btn-sm btn-secondary" onClick={() => handleEditTicket(t)} title="Editar"><FaEdit /></button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteTicket(t)} title="Eliminar"><FaTrash /></button>
                        </td>
                      </tr>
                    ))}
                    {(!clienteDetalle.tickets || clienteDetalle.tickets.length === 0) && (
                      <tr><td colSpan={8}>No hay incidencias registradas para este cliente.</td></tr>
                    )}
                  </tbody>
                </table>
              </>
            )}
          </div>

          {/* Modales para detalle */}
          <ClienteModal isOpen={!!editingCliente} onClose={() => setEditingCliente(null)} onSave={saveClienteDetalle} cliente={editingCliente} />
          <ContactModal isOpen={showContactModal} onClose={() => { setShowContactModal(false); setEditingContact(null) }} onSave={handleSaveContact} contact={editingContact} />
          <InvoiceModal isOpen={invoiceModalOpen} onClose={() => { setInvoiceModalOpen(false); setEditingInvoice(null) }} onSave={handleSaveInvoice} invoice={editingInvoice} />
          <ContractModal isOpen={contractModalOpen} onClose={() => { setContractModalOpen(false); setEditingContract(null) }} onSave={handleSaveContract} contract={editingContract} />
          <PaymentModal isOpen={paymentsModalOpen} onClose={() => { setPaymentsModalOpen(false); setEditingPayment(null) }} onSave={handleSavePayment} payment={editingPayment} />
          <MeetingModal isOpen={meetingsModalOpen} onClose={() => { setMeetingsModalOpen(false); setEditingMeeting(null) }} onSave={handleSaveMeeting} meeting={editingMeeting} />
          <TicketModal isOpen={ticketsModalOpen} onClose={() => { setTicketsModalOpen(false); setEditingTicket(null) }} onSave={handleSaveTicket} ticket={editingTicket} />
          <PreferenceModal isOpen={preferencesModalOpen} onClose={() => setPreferencesModalOpen(false)} onSave={handleSavePreferences} preferences={clienteDetalle.preferences} />
          
          <ConfirmModal isOpen={!!deletingContact} onClose={() => setDeletingContact(null)} onConfirm={confirmDeleteContact} title="Eliminar Contacto" message={`¿Eliminar al contacto "${deletingContact?.nombre}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
          <ConfirmModal isOpen={!!deletingInvoice} onClose={() => setDeletingInvoice(null)} onConfirm={confirmDeleteInvoice} title="Eliminar Factura" message={`¿Eliminar la factura "${deletingInvoice?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
          <ConfirmModal isOpen={!!deletingContractItem} onClose={() => setDeletingContractItem(null)} onConfirm={confirmDeleteContract} title="Eliminar Contrato" message={`¿Eliminar el contrato "${deletingContractItem?.numero}"?`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
          <ConfirmModal isOpen={!!deletingPayment} onClose={() => setDeletingPayment(null)} onConfirm={confirmDeletePayment} title="Eliminar Pago" message="¿Eliminar el registro de pago?" confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
          <ConfirmModal isOpen={!!deletingMeeting} onClose={() => setDeletingMeeting(null)} onConfirm={confirmDeleteMeeting} title="Eliminar Reunión" message="¿Eliminar la reunión?" confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
          <ConfirmModal isOpen={!!deletingTicket} onClose={() => setDeletingTicket(null)} onConfirm={confirmDeleteTicket} title="Eliminar Incidencia" message="¿Eliminar la incidencia?" confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        </div>
      </div>
    )
  }

  // Vista listado de clientes
  return (
    <div className="clientes-page">
      <SideMenu />
      <div className="clientes-content">
        <div className="clientes-header">
          <h1>Gestión de Clientes</h1>
          <button className="btn btn-primary" onClick={handleCreate}>
            <FaPlus /> Crear Cliente
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="clientes-table-container">
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Nombre del Cliente</th>
                <th>CIF/NIF</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Línea de Negocio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(cliente => (
                <tr key={cliente.id} className={!cliente.activo ? 'inactive-row' : ''}>
                  <td className="cliente-name">{cliente.nombre}</td>
                  <td>{cliente.cif}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td><span className="descripcion-text">{cliente.linea}</span></td>
                  <td>
                    <span className={`status-badge ${cliente.activo ? 'active' : 'inactive'}`}>
                      {cliente.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="actions-cell">
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
        </div>

        {clientes.length === 0 && (
          <div className="no-clientes">
            <h3>No hay clientes</h3>
            <p>Empieza creando tu primer cliente</p>
            <button className="btn btn-primary" onClick={handleCreate}><FaPlus /> Crear Cliente</button>
          </div>
        )}

        <ClienteModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSave={handleSave} />
        <ClienteModal isOpen={!!editingCliente && !id} onClose={() => setEditingCliente(null)} onSave={handleSave} cliente={editingCliente} />
        <ConfirmModal isOpen={!!deletingCliente} onClose={() => setDeletingCliente(null)} onConfirm={handleConfirmDelete} title="Eliminar Cliente" message={`¿Eliminar al cliente "${deletingCliente?.nombre}"? Esta acción no se puede deshacer.`} confirmText="Sí, eliminar" cancelText="Cancelar" isDanger={true} />
        <ConfirmModal isOpen={!!togglingCliente} onClose={() => setTogglingCliente(null)} onConfirm={handleConfirmToggle} title={togglingCliente?.activo ? 'Desactivar Cliente' : 'Activar Cliente'} message={`¿Cambiar el estado de "${togglingCliente?.nombre}" a ${togglingCliente?.activo ? 'INACTIVO' : 'ACTIVO'}?`} confirmText="Sí, cambiar" cancelText="Cancelar" isDanger={false} />
      </div>
    </div>
  )
}
