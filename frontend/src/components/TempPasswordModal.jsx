import React, { useState } from 'react'
import './TempPasswordModal.css'

export default function TempPasswordModal({ isOpen, onClose, tempPassword, username, isReset }) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content temp-password-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isReset ? '🔑 Contraseña Restablecida' : '✅ Usuario Creado'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="success-message">
            {isReset ? (
              <>
                <p>La contraseña de <strong>{username}</strong> ha sido restablecida correctamente.</p>
              </>
            ) : (
              <>
                <p>El usuario <strong>{username}</strong> ha sido creado exitosamente.</p>
              </>
            )}
          </div>

          <div className="password-box">
            <label>Contraseña Temporal:</label>
            <div className="password-display">
              <code>{tempPassword}</code>
              <button 
                className="btn btn-copy" 
                onClick={handleCopy}
                title="Copiar contraseña"
              >
                {copied ? '✓ Copiado' : '📋 Copiar'}
              </button>
            </div>
          </div>

          <div className="warning-box">
            <strong>⚠️ Importante:</strong>
            <ul>
              <li>Esta contraseña es temporal y expira en <strong>1 hora</strong></li>
              <li>El usuario deberá cambiarla en su primer inicio de sesión</li>
              <li>Guarda esta contraseña en un lugar seguro</li>
              <li>Esta ventana solo se mostrará una vez</li>
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
