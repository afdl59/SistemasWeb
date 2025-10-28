import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SideMenu.css'

export default function SideMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const navigate = useNavigate()

  const toggle = () => setOpen((v) => !v)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleLogout = () => {
    navigate('/login')
    setOpen(false)
  }

  return (
    <>
      <button className={`burger-btn ${open ? 'open' : ''}`} onClick={toggle} aria-label="Abrir menú">
        <span className="burger-img" role="img" aria-hidden>🍔</span>
      </button>

      <div className={`menu-backdrop ${open ? 'visible' : ''}`} onClick={() => open && setOpen(false)} />

      <div
        ref={panelRef}
        className={`floating-menu ${open ? 'open' : ''}`}
        style={{ zIndex: 10050 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-inner">
          <div className="menu-top">
            <div className="logo">CRM Grupo Alejandro</div>
            <div className="role">Administrador — Super Admin</div>
          </div>

          <nav className="menu-list">
            <button className="menu-item">Dashboard</button>
            <button className="menu-item">Gestión de Pedidos</button>
            <button className="menu-item">Bolsa de Trabajo</button>
            <button className="menu-item">Gestión de Usuarios</button>
            <button className="menu-item">Líneas de Negocio</button>
            <button className="menu-item">Manual de Uso</button>
            <button className="menu-item">Configuración</button>
          </nav>

          <div className="menu-actions">
            <button className="btn logout" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </>
  )
}
