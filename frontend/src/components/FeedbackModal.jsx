import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

export default function FeedbackModal({ isOpen, onClose, onSave, feedback }) {
  const [form, setForm] = useState({ fecha: '', origen: 'Encuesta', valor: 8, categoria: 'Atención', comentario: '', nivel: 'Alto' })

  useEffect(() => {
    if (feedback) setForm({ fecha: feedback.fecha || '', origen: feedback.origen || 'Encuesta', valor: feedback.valor ?? 8, categoria: feedback.categoria || 'Atención', comentario: feedback.comentario || '', nivel: feedback.nivel || 'Alto' })
    else setForm({ fecha: '', origen: 'Encuesta', valor: 8, categoria: 'Atención', comentario: '', nivel: 'Alto' })
  }, [feedback, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.fecha.trim()) { alert('La fecha es obligatoria'); return }
    const data = { id: feedback?.id || Date.now(), fecha: form.fecha, origen: form.origen, valor: Number(form.valor) || 0, categoria: form.categoria, comentario: form.comentario, nivel: form.nivel }
    onSave(data)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>{feedback ? '✏️ Editar Feedback' : '➕ Añadir Feedback'}</h2>

        <div className="form-group">
          <label>Fecha <span className="required">*</span></label>
          <input name="fecha" value={form.fecha} onChange={handleChange} placeholder="10/03/2024" autoFocus />
        </div>

        <div className="form-group">
          <label>Origen</label>
          <select name="origen" value={form.origen} onChange={handleChange}>
            <option>Encuesta</option>
            <option>Llamada</option>
            <option>Reunión</option>
            <option>Ticket resuelto</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Valoración (1-10)</label>
          <input name="valor" value={form.valor} onChange={handleChange} placeholder="8" />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option>Atención</option>
            <option>Tiempo de respuesta</option>
            <option>Calidad del servicio</option>
            <option>Precio</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Comentario breve</label>
          <input name="comentario" value={form.comentario} onChange={handleChange} placeholder="Muy buena atención y rapidez en la respuesta." />
        </div>

        <div className="form-group">
          <label>Nivel</label>
          <select name="nivel" value={form.nivel} onChange={handleChange}>
            <option>Alto</option>
            <option>Medio</option>
            <option>Bajo</option>
          </select>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">{feedback ? 'Guardar' : 'Añadir feedback'}</button>
        </div>
      </form>
    </Modal>
  )
}
