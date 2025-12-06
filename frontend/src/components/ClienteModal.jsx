import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'
//Comentarios
export default function ClienteModal({ isOpen, onClose, onSave, cliente }) {
  const [formData, setFormData] = useState({
    nombre: '',
    cif: '',
    email: '',
    telefono: '',
    linea: '',
    activo: true
  })

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre || '',
        cif: cliente.cif || '',
        email: cliente.email || '',
        telefono: cliente.telefono || '',
        linea: cliente.linea || '',
        activo: cliente.activo !== undefined ? cliente.activo : true
      })
    } else {
      setFormData({ nombre: '', cif: '', email: '', telefono: '', linea: '', activo: true })
    }
  }, [cliente, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio')
      return
    }

    const clienteData = {
      id: cliente?.id || Date.now(),
      ...formData,
      fecha_creacion: cliente?.fecha_creacion || new Date().toISOString()
    }

    onSave(clienteData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{cliente ? '✏️ Editar Cliente' : '➕ Nuevo Cliente'}</h2>

        <div className="form-group">
          <label htmlFor="nombre">Nombre del Cliente <span className="required">*</span></label>
          <input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} autoFocus />
        </div>

        <div className="form-group">
          <label htmlFor="cif">CIF/NIF</label>
          <input id="cif" name="cif" value={formData.cif} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="linea">Línea de Negocio asociada</label>
          <input id="linea" name="linea" value={formData.linea} onChange={handleChange} placeholder="Ej: Almacén y transporte" />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} />
            <span>Cliente activo</span>
          </label>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{cliente ? 'Guardar Cambios' : 'Crear Cliente'}</button>
        </div>
      </form>
    </Modal>
  )
}
