import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/global.css'

export default function Landing() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Para pruebas, simplemente redirigimos al login
    navigate('/login')
  }

  return (
    <div className="landing-page">
      <div className="landing-blank">
        {/* Botón para cerrar sesión (pruebas) */}
        <div style={{position:'absolute', top:20, right:20}}>
          <button className="btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </div>
  )
}
