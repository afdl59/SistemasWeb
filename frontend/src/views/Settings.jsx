import React, { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import './Settings.css'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  const [userConfig, setUserConfig] = useState({
    nombre: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [pageConfig, setPageConfig] = useState({
    theme: 'light',
    language: 'es',
    font_size: 'medium',
    high_contrast: false,
    reduce_animations: false,
    compact_mode: false,
    push_notifications: true
  })

  useEffect(() => {
    // Simulate loading preferences
    const t = setTimeout(() => {
      const saved = localStorage.getItem('app_settings')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setPageConfig(parsed.pageConfig || pageConfig)
          setUserConfig(parsed.userConfig || userConfig)
        } catch (e) {
          // ignore
        }
      }
      setLoading(false)
    }, 200)
    return () => clearTimeout(t)
  }, [])

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 4000)
  }

  const handleUserConfigChange = (field, value) => {
    setUserConfig(prev => ({ ...prev, [field]: value }))
  }

  const handlePageConfigChange = (field, value) => {
    setPageConfig(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Save to localStorage until backend is ready
    localStorage.setItem('app_settings', JSON.stringify({ userConfig, pageConfig }))
    showMessage('Preferencias guardadas', 'success')
  }

  if (loading) return (
    <div className="settings-container">
      <SideMenu />
      <div className="settings-loading">
        <div className="loading-spinner"></div>
        <p>Cargando configuración...</p>
      </div>
    </div>
  )

  return (
    <div className="settings-container">
      <SideMenu />
      <div className="settings-main">
        <div className="settings-header">
          <div className="header-content">
            <h1>⚙️ Configuración</h1>
            <p className="header-subtitle">Administra tu cuenta y preferencias de la aplicación</p>
          </div>
        </div>

        {message && (
          <div className={`settings-alert ${messageType === 'success' ? 'alert-success' : 'alert-error'}`}>
            {messageType === 'success' ? '✓' : '⚠️'} {message}
          </div>
        )}

        <div className="settings-content">
          {/* Sección de Cuenta */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">👤</div>
              <div>
                <h2>Información de Cuenta</h2>
                <p className="card-description">Actualiza tu información personal</p>
              </div>
            </div>

            <div className="card-body">
              <div className="settings-grid">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre completo</label>
                  <input 
                    id="nombre"
                    type="text"
                    value={userConfig.nombre} 
                    onChange={e => handleUserConfigChange('nombre', e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo electrónico</label>
                  <input 
                    id="email"
                    type="email"
                    value={userConfig.email} 
                    onChange={e => handleUserConfigChange('email', e.target.value)}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  💾 Guardar cambios de cuenta
                </button>
              </div>
            </div>
          </div>

          {/* Sección de Seguridad */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">🔒</div>
              <div>
                <h2>Seguridad</h2>
                <p className="card-description">Cambia tu contraseña regularmente para mayor seguridad</p>
              </div>
            </div>

            <div className="card-body password-section">
              <div className="form-group">
                <label htmlFor="currentPassword">Contraseña actual</label>
                <input 
                  id="currentPassword"
                  type="password" 
                  placeholder="••••••••" 
                  value={userConfig.currentPassword} 
                  onChange={e => handleUserConfigChange('currentPassword', e.target.value)}
                />
              </div>

              <div className="settings-grid">
                <div className="form-group">
                  <label htmlFor="newPassword">Nueva contraseña</label>
                  <input 
                    id="newPassword"
                    type="password" 
                    placeholder="••••••••" 
                    value={userConfig.newPassword} 
                    onChange={e => handleUserConfigChange('newPassword', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="••••••••" 
                    value={userConfig.confirmPassword} 
                    onChange={e => handleUserConfigChange('confirmPassword', e.target.value)}
                  />
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-warning" onClick={() => {
                  if (userConfig.newPassword !== userConfig.confirmPassword) {
                    showMessage('Las contraseñas no coinciden', 'error')
                    return
                  }
                  if (userConfig.newPassword.length < 6) {
                    showMessage('La contraseña debe tener al menos 6 caracteres', 'error')
                    return
                  }
                  handleSave()
                  setUserConfig(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }))
                  showMessage('Contraseña actualizada correctamente', 'success')
                }}>
                  🔑 Cambiar contraseña
                </button>
              </div>
            </div>
          </div>

          {/* Sección de Preferencias */}
          <div className="settings-card">
            <div className="card-header">
              <div className="card-icon">🎨</div>
              <div>
                <h2>Preferencias de Visualización</h2>
                <p className="card-description">Personaliza la apariencia de la aplicación</p>
              </div>
            </div>

            <div className="card-body">
              <div className="settings-grid">
                <div className="form-group">
                  <label htmlFor="theme">Tema</label>
                  <select 
                    id="theme"
                    value={pageConfig.theme} 
                    onChange={e => handlePageConfigChange('theme', e.target.value)}
                  >
                    <option value="light">☀️ Claro</option>
                    <option value="dark">🌙 Oscuro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="language">Idioma</label>
                  <select 
                    id="language"
                    value={pageConfig.language} 
                    onChange={e => handlePageConfigChange('language', e.target.value)}
                  >
                    <option value="es">🇪🇸 Español</option>
                    <option value="en">🇬🇧 English</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="font_size">Tamaño de fuente</label>
                  <select 
                    id="font_size"
                    value={pageConfig.font_size} 
                    onChange={e => handlePageConfigChange('font_size', e.target.value)}
                  >
                    <option value="small">Pequeña</option>
                    <option value="medium">Mediana</option>
                    <option value="large">Grande</option>
                  </select>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={pageConfig.push_notifications}
                      onChange={e => handlePageConfigChange('push_notifications', e.target.checked)}
                    />
                    <span>🔔 Notificaciones push</span>
                  </label>
                </div>
              </div>

              <div className="card-actions">
                <button className="btn btn-secondary" onClick={() => { 
                  localStorage.removeItem('app_settings')
                  showMessage('Preferencias restablecidas por defecto', 'success')
                  setTimeout(() => window.location.reload(), 1500)
                }}>
                  🔄 Restablecer valores por defecto
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  💾 Guardar preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
