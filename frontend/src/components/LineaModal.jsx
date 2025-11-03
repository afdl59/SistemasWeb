import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function LineaModal({ isOpen, onClose, onSave, linea }) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    activo: true
  })

  useEffect(() => {
    if (linea) {
      setFormData({
        nombre: linea.nombre || '',
        descripcion: linea.descripcion || '',
        activo: linea.activo !== undefined ? linea.activo : true
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        activo: true
      })
    }
  }, [linea, isOpen])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio')
      return
    }

    const lineaData = {
      id: linea?.id || Date.now(),
      ...formData,
      fecha_creacion: linea?.fecha_creacion || new Date().toISOString()
    }

    onSave(lineaData)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{linea ? '✏️ Editar Línea de Negocio' : '➕ Nueva Línea de Negocio'}</h2>
        
        <div className="form-group">
          <label htmlFor="nombre">
            Nombre de la Línea <span className="required">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Consultoría IT, Desarrollo Web..."
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe brevemente esta línea de negocio..."
            rows="4"
          />
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
            />
            <span>Línea de negocio activa</span>
          </label>
          <small className="form-help">
            Las líneas inactivas no aparecerán en los formularios de bolsas de trabajo
          </small>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
          <button type="submit" className="btn-confirm">
            {linea ? 'Guardar Cambios' : 'Crear Línea'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
