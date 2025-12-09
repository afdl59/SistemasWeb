import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/global.css'

export default function ChangePassword() {
  const navigate = useNavigate()
  const location = useLocation()
  const userData = location.state

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Verificar que tengamos los datos del usuario
  if (!userData || !userData.userId) {
    navigate('/login')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validaciones
    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userData.userId,
          newPassword: newPassword
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Mostrar mensaje de éxito y redirigir al login
        alert('Contraseña actualizada exitosamente. Por favor, inicie sesión con su nueva contraseña.')
        navigate('/login')
      } else {
        setError(data.message || 'Error al cambiar la contraseña')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('Error de conexión. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: '480px' }}>
        <h2 className="brand">Sistema Personalizable de Gestion Corporativa Integral y Eficiente</h2>
        <h1 className="title">Crear Nueva Contraseña</h1>
        
        <div style={{ 
          background: '#fff3cd', 
          border: '1px solid #ffc107', 
          borderRadius: '8px', 
          padding: '1rem', 
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          color: '#856404'
        }}>
          <strong>⚠️ Contraseña Temporal Detectada</strong>
          <p style={{ margin: '0.5rem 0 0 0' }}>
            Debe crear una nueva contraseña para continuar.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
              type="text"
              value={userData.username}
              disabled
              style={{ 
                background: '#f8f9fa', 
                cursor: 'not-allowed',
                color: '#6c757d'
              }}
            />
          </div>

          <div>
            <label>Nueva Contraseña</label>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
            <small style={{ color: '#6c757d', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
              Mínimo 6 caracteres
            </small>
          </div>

          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Repita la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error" style={{ 
              background: '#f8d7da',
              color: '#721c24',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid #f5c6cb'
            }}>
              {error}
            </div>
          )}

          <button 
            className="btn" 
            type="submit"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
          </button>
        </form>

        <p style={{ 
          marginTop: '1.5rem', 
          fontSize: '0.85rem', 
          color: '#6c757d',
          textAlign: 'center'
        }}>
          Esta acción es obligatoria para acceder al sistema.
        </p>
      </div>
    </div>
  )
}
