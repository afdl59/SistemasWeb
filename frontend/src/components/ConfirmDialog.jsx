import React from 'react'
import './ConfirmDialog.css'

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger' // 'danger', 'warning', 'info'
}) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className={`modal-header confirm-header ${type}`}>
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className={`confirm-message ${type}`}>
            {type === 'danger' && <span className="icon">⚠️</span>}
            {type === 'warning' && <span className="icon">⚡</span>}
            {type === 'info' && <span className="icon">ℹ️</span>}
            <p>{message}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {cancelText}
          </button>
          <button className={`btn btn-${type}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
