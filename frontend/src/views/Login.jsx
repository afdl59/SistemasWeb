import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showAnim, setShowAnim] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    // Credenciales hardcodeadas por ahora
    if (username === 'admin' && password === '12345') {
      setShowAnim(true)
      // Simular pequeña animación y luego redirigir a /landing
      setTimeout(() => {
        navigate('/landing')
      }, 1200)
    } else {
      setError('Usuario o contraseña inválidos')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="brand">CRM Grupo Alejandro</h2>
        <h3 className="title">Iniciar Sesión</h3>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn" type="submit">Iniciar Sesión</button>
        </form>
      </div>

      {showAnim && (
        <div className="overlay">
          <div className="anim-box">
            <div className="checkmark">✓</div>
            <div className="anim-text">Sesión iniciada</div>
          </div>
        </div>
      )}
    </div>
  )
}
