import React, { useState, useEffect } from 'react'
import Modal from './Modal'

export default function BolsaModal({ isOpen, onClose, onSave, bolsa = null }) {
  // Placeholder de líneas de negocio hasta que exista la BD
  const LINEAS_PLACEHOLDER = [
    { id: 1, nombre: 'Logística' },
    { id: 2, nombre: 'Industrial' },
    { id: 3, nombre: 'Retail' }
  ]

  const [formData, setFormData] = useState({
    numero_pedido: '',
    cliente: '',
    ubicacion: '',
    puesto: '',
    num_posiciones: 1,
    linea_negocio: '',
    descripcion: '',
    requisitos: '',
    salario: '',
    horario: ''
  })

  const [lineasNegocio, setLineasNegocio] = useState(LINEAS_PLACEHOLDER)

  useEffect(() => {
    if (bolsa) {
      setFormData({
        numero_pedido: bolsa.numero_pedido || '',
        cliente: bolsa.cliente || '',
        ubicacion: bolsa.ubicacion || '',
        puesto: bolsa.puesto || '',
        num_posiciones: bolsa.num_posiciones || 1,
        linea_negocio: bolsa.linea_negocio || '',
        descripcion: bolsa.descripcion || '',
        requisitos: bolsa.requisitos || '',
        salario: bolsa.salario || '',
        horario: bolsa.horario || ''
      })
    } else {
      // Reset form when creating new
      setFormData({
        numero_pedido: `B-${Date.now()}`,
        cliente: '',
        ubicacion: '',
        puesto: '',
        num_posiciones: 1,
        linea_negocio: '',
        descripcion: '',
        requisitos: '',
        salario: '',
        horario: ''
      })
    }
  }, [bolsa, isOpen])

  useEffect(() => {
    // TODO: Cuando exista la BD, reemplazar con: 
    // fetch('/api/lineas-negocio').then(res => res.json()).then(setLineasNegocio)
    setLineasNegocio(LINEAS_PLACEHOLDER)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bolsa ? 'Editar Bolsa de Trabajo' : 'Crear Nueva Bolsa de Trabajo'}
      size="large"
    >
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Número de Pedido *</label>
            <input
              type="text"
              name="numero_pedido"
              value={formData.numero_pedido}
              onChange={handleChange}
              required
              placeholder="B-123456"
            />
          </div>

          <div className="form-group">
            <label>Cliente / Empresa *</label>
            <input
              type="text"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              required
              placeholder="Nombre de la empresa"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Puesto *</label>
            <input
              type="text"
              name="puesto"
              value={formData.puesto}
              onChange={handleChange}
              required
              placeholder="Ej: Operario/a de Almacén"
            />
          </div>

          <div className="form-group">
            <label>Ubicación / Localidad *</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              required
              placeholder="Madrid, Barcelona..."
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Número de Posiciones *</label>
            <input
              type="number"
              name="num_posiciones"
              value={formData.num_posiciones}
              onChange={handleChange}
              required
              min="1"
              placeholder="1"
            />
          </div>

          <div className="form-group">
            <label>Línea de Negocio *</label>
            <select
              name="linea_negocio"
              value={formData.linea_negocio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar...</option>
              {lineasNegocio.map(linea => (
                <option key={linea.id} value={linea.nombre}>
                  {linea.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Salario (opcional)</label>
            <input
              type="text"
              name="salario"
              value={formData.salario}
              onChange={handleChange}
              placeholder="Ej: 1.400€ - 1.600€ bruto/mes"
            />
          </div>

          <div className="form-group">
            <label>Horario (opcional)</label>
            <input
              type="text"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              placeholder="Ej: L-V 8:00-16:00"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Descripción del Puesto *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            placeholder="Descripción detallada de las funciones y responsabilidades..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Requisitos *</label>
          <textarea
            name="requisitos"
            value={formData.requisitos}
            onChange={handleChange}
            required
            placeholder="Experiencia, formación, habilidades requeridas..."
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {bolsa ? 'Guardar Cambios' : 'Crear Bolsa'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
