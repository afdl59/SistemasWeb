import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function ContactModal({ isOpen, onClose, onSave, contact }) {
  const [formData, setFormData] = useState({ nombre: '', cargo: '', email: '', telefono: '' })

  useEffect(() => {
    if (contact) setFormData({ nombre: contact.nombre || '', cargo: contact.cargo || '', email: contact.email || '', telefono: contact.telefono || '' })
    else setFormData({ nombre: '', cargo: '', email: '', telefono: '' })
  }, [contact, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim()) { alert('El nombre es obligatorio'); return }
    const data = { id: contact?.id || Date.now(), ...formData }
    onSave(data)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="small">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{contact ? '✏️ Editar Contacto' : '➕ Nuevo Contacto'}</h2>
        <div className="form-group">
          <label>Nombre <span className="required">*</span></label>
          <input name="nombre" value={formData.nombre} onChange={handleChange} autoFocus />
        </div>
        <div className="form-group">
          <label>Cargo</label>
          <input name="cargo" value={formData.cargo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{contact ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </Modal>
  )
}
