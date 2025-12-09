import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [mostrarPass, setMostrarPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAnim, setShowAnim] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Verificar si necesita cambiar contraseña
        if (data.requirePasswordChange) {
          // Redirigir a la página de cambio de contraseña
          navigate('/change-password', { 
            state: { 
              userId: data.userId, 
              username: data.username,
              nombre: data.nombre
            } 
          })
        } else if (data.success) {
          // Login exitoso - guardar datos del usuario
          localStorage.setItem('user', JSON.stringify(data.user))
          
          setShowAnim(true)
          setTimeout(() => {
            navigate('/landing')
          }, 1200)
        }
      } else {
        setError(data.message || 'Error al iniciar sesión')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión. Verifique que el servidor esté activo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <div className="bg-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
      
      <div className="contenedor-principal">
        <div className="logo-section">
          <div className="logo-circle">
            <svg viewBox="0 0 100 100" className="logo-svg">
              <text x="50" y="65" fontSize="32" fontWeight="600" textAnchor="middle" fill="currentColor">CRM</text>
            </svg>
          </div>
          <h1 className="company-title">Sistema Personalizable de Gestion Corporativa Integral y Eficiente</h1>
          <p className="tagline">Sistema de gestión empresarial</p>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="user">Usuario</label>
              <input
                id="user"
                type="text"
                placeholder="Introduce tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="pass">Contraseña</label>
              <div className="input-with-icon">
                <input
                  id="pass"
                  type={mostrarPass ? "text" : "password"}
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setMostrarPass(!mostrarPass)}
                  tabIndex={-1}
                >
                  {mostrarPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="msg-error">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verificando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            <div className="extra-options">
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>

      {showAnim && (
        <div className="success-overlay">
          <div className="success-content">
            <div className="checkmark-wrapper">
              <svg className="checkmark" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            <p className="success-text">Acceso concedido</p>
          </div>
        </div>
      )}
    </div>
  )
}
