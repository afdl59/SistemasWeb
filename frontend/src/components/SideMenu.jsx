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

  const dashboard = () => {
    navigate('/landing')
    setOpen(false)
  }

  const pedidos = () => {
    navigate('/pedidos')
    setOpen(false)
  }

  const bolsaTrabajo = () => {
    navigate('/bolsaTrabajo')
    setOpen(false)
  }

  const usuarios = () => {
    navigate('/usuarios')
    setOpen(false)
  }

  const manualUso = () => {
    navigate('/manualUso')
    setOpen(false)
  }

  const lineasnegocio = () => {
    navigate('/LineasNegocio')
    setOpen(false)
  }

  const config = () => {
    navigate('/Configuracion')
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
            <button className="menu-item" onClick={dashboard}>📊 Dashboard</button>
            <button className="menu-item" onClick={pedidos}>🧾 Gestión de Pedidos</button>
            <button className="menu-item" onClick={bolsaTrabajo}>👥 Bolsa de Trabajo</button>
            <button className="menu-item" onClick={usuarios}>🔐 Gestión de Usuarios</button>
            <button className="menu-item" onClick={lineasnegocio}>🏢 Líneas de Negocio</button>
            <button className="menu-item" onClick={manualUso}>📘 Manual de Uso</button>
            <button className="menu-item" onClick={config}>⚙️ Configuración</button>
          </nav>

          <div className="menu-actions">
            <button className="btn logout" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </>
  )
}
