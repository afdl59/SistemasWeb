import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function InvoiceModal({ isOpen, onClose, onSave, invoice }) {
  const [formData, setFormData] = useState({ numero: '', fecha: '', importe: '', estado: 'Pendiente', metodo: '' })

  useEffect(() => {
    if (invoice) setFormData({ numero: invoice.numero || '', fecha: invoice.fecha || '', importe: invoice.importe ?? '', estado: invoice.estado || 'Pendiente', metodo: invoice.metodo || '' })
    else setFormData({ numero: '', fecha: '', importe: '', estado: 'Pendiente', metodo: '' })
  }, [invoice, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.numero.trim()) { alert('El número de factura es obligatorio'); return }
    const data = { id: invoice?.id || Date.now(), numero: formData.numero, fecha: formData.fecha, importe: parseFloat(String(formData.importe).replace(',', '.')) || 0, estado: formData.estado, metodo: formData.metodo }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{invoice ? '✏️ Editar Factura' : '➕ Nueva Factura'}</h2>

        <div className="form-group">
          <label>Número de factura <span className="required">*</span></label>
          <input name="numero" value={formData.numero} onChange={handleChange} autoFocus />
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <input name="fecha" value={formData.fecha} onChange={handleChange} placeholder="DD/MM/YYYY" />
        </div>

        <div className="form-group">
          <label>Importe</label>
          <input name="importe" value={formData.importe} onChange={handleChange} placeholder="1250,00" />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option>Pagada</option>
            <option>Pendiente</option>
            <option>Vencida</option>
          </select>
        </div>

        <div className="form-group">
          <label>Método de pago</label>
          <input name="metodo" value={formData.metodo} onChange={handleChange} placeholder="Transferencia, Tarjeta, Domiciliación" />
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{invoice ? 'Guardar' : 'Crear Factura'}</button>
        </div>
      </form>
    </Modal>
  )
}
