import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function ContractModal({ isOpen, onClose, onSave, contract }) {
  const [formData, setFormData] = useState({ numero: '', inicio: '', fin: '', importe: '', tipo: '', estado: 'Vigente' })

  useEffect(() => {
    if (contract) setFormData({ numero: contract.numero || '', inicio: contract.inicio || '', fin: contract.fin || '', importe: contract.importe ?? '', tipo: contract.tipo || '', estado: contract.estado || 'Vigente' })
    else setFormData({ numero: '', inicio: '', fin: '', importe: '', tipo: '', estado: 'Vigente' })
  }, [contract, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.numero.trim()) { alert('El número de contrato es obligatorio'); return }
    const data = { id: contract?.id || Date.now(), numero: formData.numero, inicio: formData.inicio, fin: formData.fin, importe: parseFloat(String(formData.importe).replace(',', '.')) || 0, tipo: formData.tipo, estado: formData.estado }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{contract ? '✏️ Editar Contrato' : '➕ Nuevo Contrato'}</h2>

        <div className="form-group">
          <label>Número de contrato <span className="required">*</span></label>
          <input name="numero" value={formData.numero} onChange={handleChange} autoFocus />
        </div>

        <div className="form-group">
          <label>Fecha de inicio</label>
          <input name="inicio" value={formData.inicio} onChange={handleChange} placeholder="DD/MM/YYYY" />
        </div>

        <div className="form-group">
          <label>Fecha de fin</label>
          <input name="fin" value={formData.fin} onChange={handleChange} placeholder="DD/MM/YYYY" />
        </div>

        <div className="form-group">
          <label>Importe</label>
          <input name="importe" value={formData.importe} onChange={handleChange} placeholder="3500,00" />
        </div>

        <div className="form-group">
          <label>Tipo de contrato</label>
          <input name="tipo" value={formData.tipo} onChange={handleChange} placeholder="Mantenimiento, Suministro..." />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option>Vigente</option>
            <option>Próximo a vencer</option>
            <option>Vencido</option>
            <option>Cancelado</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{contract ? 'Guardar' : 'Crear Contrato'}</button>
        </div>
      </form>
    </Modal>
  )
}
