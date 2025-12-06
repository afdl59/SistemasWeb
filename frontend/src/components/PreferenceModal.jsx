import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import './Modal.css'

//commits 
export default function PreferenceModal({ isOpen, onClose, onSave, preferences }) {
  const [form, setForm] = useState({ metodoContacto: 'Email', franjaHoraria: 'Tarde (16:00 – 20:00)', idioma: 'Español', frecuenciaContacto: 'Mensual', nivelFormalidad: 'Neutral', notas: '' })

  useEffect(() => {
    if (preferences) setForm({
      metodoContacto: preferences.metodoContacto || 'Email',
      franjaHoraria: preferences.franjaHoraria || 'Tarde (16:00 – 20:00)',
      idioma: preferences.idioma || 'Español',
      frecuenciaContacto: preferences.frecuenciaContacto || 'Mensual',
      nivelFormalidad: preferences.nivelFormalidad || 'Neutral',
      notas: preferences.notas || ''
    })
    else setForm({ metodoContacto: 'Email', franjaHoraria: 'Tarde (16:00 – 20:00)', idioma: 'Español', frecuenciaContacto: 'Mensual', nivelFormalidad: 'Neutral', notas: '' })
  }, [preferences, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="medium">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>✏️ Editar Preferencias</h2>

        <div className="form-group">
          <label>Método de contacto preferido</label>
          <select name="metodoContacto" value={form.metodoContacto} onChange={handleChange}>
            <option>Email</option>
            <option>Teléfono</option>
            <option>WhatsApp</option>
            <option>Videollamada</option>
          </select>
        </div>

        <div className="form-group">
          <label>Franja horaria preferida</label>
          <select name="franjaHoraria" value={form.franjaHoraria} onChange={handleChange}>
            <option>Mañana (08:00 – 12:00)</option>
            <option>Mediodía (12:00 – 16:00)</option>
            <option>Tarde (16:00 – 20:00)</option>
            <option>No llamar fuera de horario</option>
          </select>
        </div>

        <div className="form-group">
          <label>Idioma preferido</label>
          <select name="idioma" value={form.idioma} onChange={handleChange}>
            <option>Español</option>
            <option>Inglés</option>
            <option>Francés</option>
            <option>Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Frecuencia de contacto</label>
          <select name="frecuenciaContacto" value={form.frecuenciaContacto} onChange={handleChange}>
            <option>Semanal</option>
            <option>Mensual</option>
            <option>Trimestral</option>
            <option>Solo cuando sea necesario</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nivel de formalidad</label>
          <select name="nivelFormalidad" value={form.nivelFormalidad} onChange={handleChange}>
            <option>Alta formalidad</option>
            <option>Neutral</option>
            <option>Informal</option>
          </select>
        </div>

        <div className="form-group">
          <label>Notas adicionales</label>
          <textarea name="notas" value={form.notas} onChange={handleChange} placeholder="Notas sobre preferencias..." />
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
          <button type="submit" className="btn-confirm">Guardar preferencias</button>
        </div>
      </form>
    </Modal>
  )
}
