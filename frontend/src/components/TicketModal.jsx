import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function TicketModal({ isOpen, onClose, onSave, ticket }) {
  const [form, setForm] = useState({ numero: '', fecha: '', prioridad: 'Media', tipo: 'Soporte técnico', descripcion: '', estado: 'Abierta', responsable: '' })

  useEffect(() => {
    if (ticket) setForm({ numero: ticket.numero || '', fecha: ticket.fecha || '', prioridad: ticket.prioridad || 'Media', tipo: ticket.tipo || 'Soporte técnico', descripcion: ticket.descripcion || '', estado: ticket.estado || 'Abierta', responsable: ticket.responsable || '' })
    else setForm({ numero: '', fecha: '', prioridad: 'Media', tipo: 'Soporte técnico', descripcion: '', estado: 'Abierta', responsable: '' })
  }, [ticket, isOpen])

  const handleChange = (e) => { const { name, value } = e.target; setForm(prev => ({ ...prev, [name]: value })) }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.numero.trim()) { alert('El número de incidencia es obligatorio'); return }
    const data = { id: ticket?.id || Date.now(), numero: form.numero, fecha: form.fecha, prioridad: form.prioridad, tipo: form.tipo, descripcion: form.descripcion, estado: form.estado, responsable: form.responsable }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{ticket ? '✏️ Editar Incidencia' : '➕ Nueva Incidencia'}</h2>

        <div className="form-group">
          <label>Nº de ticket <span className="required">*</span></label>
          <input name="numero" value={form.numero} onChange={handleChange} placeholder="TCK-2024-001" autoFocus />
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <input name="fecha" value={form.fecha} onChange={handleChange} placeholder="12/04/2024" />
        </div>

        <div className="form-group">
          <label>Prioridad</label>
          <select name="prioridad" value={form.prioridad} onChange={handleChange}>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de incidencia</label>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option>Soporte técnico</option>
            <option>Facturación</option>
            <option>Plataforma</option>
            <option>Logística</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Breve descripción de la incidencia" />
        </div>

        <div className="form-group">
          <label>Responsable</label>
          <input name="responsable" value={form.responsable} onChange={handleChange} placeholder="Ana López" />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option>Abierta</option>
            <option>En progreso</option>
            <option>Resuelta</option>
            <option>Cerrada</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{ticket ? 'Guardar' : 'Crear Incidencia'}</button>
        </div>
      </form>
    </Modal>
  )
}
