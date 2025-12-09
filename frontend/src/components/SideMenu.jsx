import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './SideMenu.css'


export default function SideMenu() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

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

  const clientes = () => {
    navigate('/Clientes')
    setOpen(false)
  }

  const config = () => {
    navigate('/Configuracion')
    setOpen(false)
  }

  return (
    <>
      <button className={`burger-btn ${open ? 'open' : ''}`} onClick={toggle} aria-label="Abrir menú">
        <svg className="infinity-icon" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="infinity-path" d="M 10,20 C 10,10 20,5 30,10 C 40,15 60,15 70,10 C 80,5 90,10 90,20 C 90,30 80,35 70,30 C 60,25 40,25 30,30 C 20,35 10,30 10,20 Z" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle className="infinity-dot" r="2.5" fill="currentColor">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#infinityPath"/>
            </animateMotion>
          </circle>
          <path id="infinityPath" d="M 10,20 C 10,10 20,5 30,10 C 40,15 60,15 70,10 C 80,5 90,10 90,20 C 90,30 80,35 70,30 C 60,25 40,25 30,30 C 20,35 10,30 10,20 Z" fill="none"/>
        </svg>
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
            <div className="logo">Sistema Personalizable de Gestion Corporativa Integral y Eficiente</div>
            <div className="role">Administrador — Super Admin</div>
          </div>

          <nav className="menu-list">
            <button className={`menu-item ${location.pathname === '/landing' ? 'active' : ''}`} onClick={dashboard}>
              <span className="menu-icon">◧</span> Dashboard
            </button>
            <button className={`menu-item ${location.pathname === '/usuarios' ? 'active' : ''}`} onClick={usuarios}>
              <span className="menu-icon">◉</span> Gestión de Usuarios
            </button>
            <button className={`menu-item ${location.pathname === '/Clientes' ? 'active' : ''}`} onClick={clientes}>
              <span className="menu-icon">◈</span> Clientes
            </button>
            <button className={`menu-item ${location.pathname === '/bolsaTrabajo' ? 'active' : ''}`} onClick={bolsaTrabajo}>
              <span className="menu-icon">◭</span> Bolsa de Trabajo
            </button>
            <button className={`menu-item ${location.pathname === '/LineasNegocio' ? 'active' : ''}`} onClick={lineasnegocio}>
              <span className="menu-icon">◫</span> Líneas de Negocio
            </button>
            <button className={`menu-item ${location.pathname === '/manualUso' ? 'active' : ''}`} onClick={manualUso}>
              <span className="menu-icon">◰</span> Manual de Uso
            </button>
            <button className={`menu-item ${location.pathname === '/Configuracion' ? 'active' : ''}`} onClick={config}>
              <span className="menu-icon">◎</span> Configuración
            </button>
          </nav>

          <div className="menu-actions">
            <button className="btn logout" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </>
  )
}
