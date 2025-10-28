import React, { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'
import './SideMenu.css'

export default function SideMenu() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [fwKey, setFwKey] = useState(0) // key to remount fireworks and retrigger animations
  const panelRef = useRef(null)
  const navigate = useNavigate()

    const toggle = () => {
      if (open) {
        setClosing(true)
        // small delay to allow closing animation
        setTimeout(() => {
          setClosing(false)
          setOpen(false)
        }, 650)
      } else {
        // opening: increment fireworks key to remount fireworks and retrigger
        setFwKey((k) => k + 1)
        setOpen(true)
        // epic confetti sequence (several bursts)
        fireEpicConfetti()
        setTimeout(fireEpicConfetti, 180)
        setTimeout(fireEpicConfetti, 380)
      }
  }

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
    // para pruebas: navegar al login
    navigate('/login')
    // cerrar menú con animación (activar blackhole)
    setClosing(true)
    // small extra confetti before vanish
    setTimeout(() => { fireEpicConfetti() }, 80)
    setTimeout(() => { setClosing(false); setOpen(false) }, 720)
  }

  // Confetti epic sequence using canvas-confetti
  const fireEpicConfetti = () => {
    try {
      // central big burst
      confetti({
        particleCount: 120,
        spread: 160,
        origin: { x: 0.5, y: 0.25 },
        scalar: 1.2
      })

      // ring pulses
      setTimeout(() => {
        confetti({ particleCount: 40, spread: 220, origin: { x: 0.2, y: 0.3 }, scalar: 1 })
        confetti({ particleCount: 40, spread: 220, origin: { x: 0.8, y: 0.3 }, scalar: 1 })
      }, 160)

      // trailing shots
      setTimeout(() => {
        confetti({ particleCount: 60, angle: 60, spread: 40, origin: { x: 0.1, y: 0.6 } })
        confetti({ particleCount: 60, angle: 120, spread: 40, origin: { x: 0.9, y: 0.6 } })
      }, 300)

      // final shimmer
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 260, origin: { x: 0.5, y: 0.1 }, scalar: 0.9 })
      }, 520)
    } catch (err) {
      // if confetti fails (e.g., SSR), ignore silently
      // console.warn('confetti error', err)
    }
  }

  return (
    <>
      <button className={`burger-btn ${open ? 'open' : ''}`} onClick={toggle} aria-label="Abrir menú">
        <span className="burger-img" role="img" aria-hidden>🍔</span>
      </button>

      <div className={`menu-backdrop ${open ? 'visible' : ''} ${closing ? 'closing' : ''}`} onClick={() => open && toggle()} />

      <div
        ref={panelRef}
        className={`floating-menu ${open ? 'open' : ''} ${closing ? 'closing' : ''}`}
        style={{ zIndex: 10050 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* blackhole visual element (expands on close) */}
        <div className={`blackhole ${closing ? 'active' : ''}`} />
        <div className="menu-inner">
          <div className="menu-top">
            <div className="logo">CRM Alejandro</div>
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

        <div className={`fireworks ${open && !closing ? 'play' : ''}`} key={fwKey} aria-hidden>
          <span className="fw fw1" />
          <span className="fw fw2" />
          <span className="fw fw3" />
          <span className="fw fw4" />
          <span className="fw fw5" />
        </div>
      </div>
    </>
  )
}
