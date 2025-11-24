import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function MeetingModal({ isOpen, onClose, onSave, meeting }) {
  const [form, setForm] = useState({ fecha: '', tipo: 'Videollamada', descripcion: '', participantes: '', estado: 'Programada' })

  useEffect(() => {
    if (meeting) setForm({ fecha: meeting.fecha || '', tipo: meeting.tipo || 'Videollamada', descripcion: meeting.descripcion || '', participantes: meeting.participantes || '', estado: meeting.estado || 'Programada' })
    else setForm({ fecha: '', tipo: 'Videollamada', descripcion: '', participantes: '', estado: 'Programada' })
  }, [meeting, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.fecha.trim()) { alert('La fecha es obligatoria'); return }
    const data = { id: meeting?.id || Date.now(), fecha: form.fecha, tipo: form.tipo, descripcion: form.descripcion, participantes: form.participantes, estado: form.estado }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{meeting ? '✏️ Editar Reunión' : '➕ Programar Reunión'}</h2>

        <div className="form-group">
          <label>Fecha (dd/mm/yyyy - hh:mm) <span className="required">*</span></label>
          <input name="fecha" value={form.fecha} onChange={handleChange} placeholder="15/06/2024 - 10:00" autoFocus />
        </div>

        <div className="form-group">
          <label>Tipo</label>
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option>Videollamada</option>
            <option>Reunión presencial</option>
            <option>Llamada</option>
            <option>Seguimiento</option>
          </select>
        </div>

        <div className="form-group">
          <label>Descripción breve</label>
          <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Presentación de propuesta 2024" />
        </div>

        <div className="form-group">
          <label>Participantes</label>
          <input name="participantes" value={form.participantes} onChange={handleChange} placeholder="Ana López (interna), Jorge Ruiz (cliente)" />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={form.estado} onChange={handleChange}>
            <option>Programada</option>
            <option>Realizada</option>
            <option>Cancelada</option>
            <option>Reprogramada</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{meeting ? 'Guardar' : 'Programar Reunión'}</button>
        </div>
      </form>
    </Modal>
  )
}
