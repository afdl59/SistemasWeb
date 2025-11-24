import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function PaymentModal({ isOpen, onClose, onSave, payment }) {
  const [formData, setFormData] = useState({ fechaPago: '', importe: '', metodo: '', factura: '', fechaLimite: '', retraso: 0, estado: 'Pagado' })

  useEffect(() => {
    if (payment) setFormData({ fechaPago: payment.fechaPago || '', importe: payment.importe ?? '', metodo: payment.metodo || '', factura: payment.factura || '', fechaLimite: payment.fechaLimite || '', retraso: payment.retraso ?? 0, estado: payment.estado || 'Pagado' })
    else setFormData({ fechaPago: '', importe: '', metodo: '', factura: '', fechaLimite: '', retraso: 0, estado: 'Pagado' })
  }, [payment, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.importe || parseFloat(String(formData.importe).replace(',', '.')) <= 0) { alert('El importe es obligatorio y debe ser mayor que 0'); return }
    const data = {
      id: payment?.id || Date.now(),
      fechaPago: formData.fechaPago || null,
      importe: parseFloat(String(formData.importe).replace(',', '.')) || 0,
      metodo: formData.metodo || '',
      factura: formData.factura || '',
      fechaLimite: formData.fechaLimite || '',
      retraso: parseInt(formData.retraso) || 0,
      estado: formData.estado || 'Pagado'
    }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{payment ? '✏️ Editar Pago' : '➕ Registrar Pago'}</h2>

        <div className="form-group">
          <label>Fecha del pago</label>
          <input name="fechaPago" value={formData.fechaPago} onChange={handleChange} placeholder="DD/MM/YYYY" />
        </div>

        <div className="form-group">
          <label>Importe <span className="required">*</span></label>
          <input name="importe" value={formData.importe} onChange={handleChange} placeholder="1250,00" autoFocus />
        </div>

        <div className="form-group">
          <label>Método de pago</label>
          <input name="metodo" value={formData.metodo} onChange={handleChange} placeholder="Transferencia, Tarjeta, Efectivo, Domiciliación" />
        </div>

        <div className="form-group">
          <label>Factura asociada</label>
          <input name="factura" value={formData.factura} onChange={handleChange} placeholder="FAC-2024-001" />
        </div>

        <div className="form-group">
          <label>Fecha límite de pago</label>
          <input name="fechaLimite" value={formData.fechaLimite} onChange={handleChange} placeholder="DD/MM/YYYY" />
        </div>

        <div className="form-group">
          <label>Retraso (días)</label>
          <input name="retraso" value={formData.retraso} onChange={handleChange} placeholder="0" />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option>Pagado</option>
            <option>Retrasado</option>
            <option>Impagado</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{payment ? 'Guardar' : 'Registrar Pago'}</button>
        </div>
      </form>
    </Modal>
  )
}
