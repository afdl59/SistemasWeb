import React, { useState, useEffect } from 'react'
import './UserModal.css'

export default function UserModal({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    role: 'Promotor',
    status: 'active'
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        role: user.role || 'Promotor',
        status: user.status || 'active'
      })
    }
  }, [user])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es obligatorio'
    } else if (formData.username.length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="name">
                Nombre Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Ej: Juan Pérez"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="username">
                Nombre de Usuario <span className="required">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'error' : ''}
                placeholder="Ej: jperez"
                disabled={!!user}
              />
              {errors.username && <span className="error-message">{errors.username}</span>}
              {user && (
                <small className="form-help">
                  El nombre de usuario no se puede modificar
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="role">
                Rol <span className="required">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="Promotor">Promotor</option>
                <option value="Admin">Administrador</option>
                <option value="Super_admin">Super Administrador</option>
              </select>
              <small className="form-help">
                Los Super Administradores tienen acceso completo al sistema
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="status">Estado</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </select>
            </div>

            {!user && (
              <div className="info-box">
                <strong>ℹ️ Nota:</strong> Se generará una contraseña temporal que el usuario 
                deberá cambiar en su primer inicio de sesión.
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? 'Actualizar' : 'Crear'} Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
