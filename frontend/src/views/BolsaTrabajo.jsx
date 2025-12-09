import React, { useEffect, useState } from 'react'
import SideMenu from '../components/SideMenu'
import BolsaModal from '../components/BolsaModal'
import { ConfirmModal } from '../components/Modal'
import './BolsaTrabajo.css'

// BolsaTrabajo view — improved layout and local fallback placeholders
export default function BolsaTrabajo() {
  const [bolsas, setBolsas] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingBolsa, setEditingBolsa] = useState(null)
  const [deletingBolsa, setDeletingBolsa] = useState(null)
  const [expandedBolsa, setExpandedBolsa] = useState(null)

  // Placeholder data used while backend/service is not connected.
  const PLACEHOLDER = [
    {
      id: 'B-1001',
      numero_pedido: 'B-1001',
      cliente: 'ACME Corp',
      ubicacion: 'Madrid',
      puesto: 'Operario/a Logística',
      descripcion: 'Gestión de paquetería y labores de almacén.',
      requisitos: 'Carnet de carretillero (preferible).',
      estado: 'activo'
    },
    {
      id: 'B-1002',
      numero_pedido: 'B-1002',
      cliente: 'RetailPro',
      ubicacion: 'Barcelona',
      puesto: 'Dependiente/a',
      descripcion: 'Atención al público y reposición en tienda.',
      requisitos: 'Disponibilidad fines de semana.',
      estado: 'activo'
    }
  ]

  useEffect(() => {
    // Simulate loading from service. Replace this with bolsaService when ready.
    setLoading(true)
    const t = setTimeout(() => {
      try {
        // If a real service exists, replace this block with a call to it.
        setBolsas(PLACEHOLDER)
        setFiltered(PLACEHOLDER)
        setError('')
      } catch (e) {
        setError('No se pudo cargar la bolsa. Usando datos de ejemplo.')
        setBolsas(PLACEHOLDER)
        setFiltered(PLACEHOLDER)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!search) return setFiltered(bolsas)
    const term = search.toLowerCase()
    setFiltered(
      bolsas.filter(b =>
        b.numero_pedido.toLowerCase().includes(term) ||
        b.cliente.toLowerCase().includes(term) ||
        b.ubicacion.toLowerCase().includes(term) ||
        b.puesto.toLowerCase().includes(term) ||
        (b.descripcion && b.descripcion.toLowerCase().includes(term))
      )
    )
  }, [search, bolsas])

  const handleCreate = () => {
    setShowCreateModal(true)
  }

  const handleEdit = (bolsa) => {
    setEditingBolsa(bolsa)
  }

  const handleDelete = (bolsa) => {
    setDeletingBolsa(bolsa)
  }

  const handleSave = (data) => {
    if (editingBolsa) {
      // Update existing
      setBolsas(prev => prev.map(b => b.id === editingBolsa.id ? { ...b, ...data } : b))
      setEditingBolsa(null)
    } else {
      // Create new
      const newBolsa = { id: `B-${Date.now()}`, ...data, estado: 'activo' }
      setBolsas(prev => [newBolsa, ...prev])
      setShowCreateModal(false)
    }
  }

  const handleConfirmDelete = () => {
    setBolsas(prev => prev.filter(b => b.id !== deletingBolsa.id))
    setDeletingBolsa(null)
  }

  const handleView = (bolsa) => {
    setExpandedBolsa(bolsa)
  }

  const handleClear = () => setSearch('')

  return (
    <div className="bolsa-container">
      <SideMenu />

      <main className="bolsa-main">
        <div className="bolsa-header">
          <div className="header-content">
            <h1>Bolsa de Trabajo</h1>
            <p className="header-subtitle">Tablón de anuncios — datos de ejemplo hasta conectar la API</p>
          </div>

          <div className="estadisticas-header">
            <div className="stat-item">
              <span className="stat-number">{bolsas.length}</span>
              <span className="stat-label">Total</span>
            </div>
          </div>
        </div>

        <div className="bolsa-actions">
          <button className="btn-crear-bolsa" onClick={handleCreate}>✨ Crear Nueva Bolsa</button>

          <div className="filtros-container">
            <div className="filtro-estado">
              <label>Buscar:</label>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="pedido, cliente, ubicación, puesto..."
                style={{ padding: '0.5rem 0.75rem', borderRadius: 6, border: '1px solid #e9ecef' }}
              />
            </div>
          </div>
        </div>

        <div className="search-container">
          {search && (
            <div className="search-results-info">Mostrando {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para "{search}"</div>
          )}
        </div>

        {loading ? (
          <div className="bolsa-loading">
            <div className="loading-spinner" />
            <p>Cargando bolsa de trabajo...</p>
          </div>
        ) : (
          <div className="bolsas-grid">
            {filtered.length === 0 ? (
              <div className="no-results">
                {search ? (
                  <>
                    <h3>🔍 No se encontraron resultados</h3>
                    <p>No hay bolsas que coincidan con "{search}"</p>
                    <button onClick={handleClear} className="btn-clear-search">Limpiar búsqueda</button>
                  </>
                ) : (
                  <>
                    <h3>📝 No hay bolsas disponibles</h3>
                    <p>Sé el primero en crear una bolsa de trabajo</p>
                    <button onClick={handleCreate} className="btn-crear-primera">Crear Primera Bolsa</button>
                  </>
                )}
              </div>
            ) : (
              filtered.map(b => (
                <article key={b.id} className="card-bolsa">
                  <h3>{b.puesto}</h3>
                  <p className="muted">{b.cliente} — {b.ubicacion} — <strong>{b.numero_pedido}</strong></p>
                  <p className="descripcion">{b.descripcion}</p>
                  <div className="card-actions">
                    <button className="btn-small" onClick={() => handleView(b)}>👁 Ver</button>
                    <button className="btn-small btn-edit" onClick={() => handleEdit(b)}>✏️ Editar</button>
                    <button className="btn-small btn-delete" onClick={() => handleDelete(b)}>🗑 Borrar</button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {/* Modales */}
        <BolsaModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSave={handleSave}
        />

        <BolsaModal
          isOpen={!!editingBolsa}
          onClose={() => setEditingBolsa(null)}
          onSave={handleSave}
          bolsa={editingBolsa}
        />

        <ConfirmModal
          isOpen={!!deletingBolsa}
          onClose={() => setDeletingBolsa(null)}
          onConfirm={handleConfirmDelete}
          title="⚠️ Eliminar Bolsa de Trabajo"
          message={`¿Estás seguro de que quieres eliminar la bolsa "${deletingBolsa?.numero_pedido}"? Esta acción no se puede deshacer.`}
          confirmText="Sí, eliminar"
          cancelText="Cancelar"
          isDanger={true}
        />

        {/* Tarjeta expandida con animación flip */}
        {expandedBolsa && (
          <div className="expanded-overlay" onClick={() => setExpandedBolsa(null)}>
            <div className="expanded-card" onClick={(e) => e.stopPropagation()}>
              <button className="expanded-close" onClick={() => setExpandedBolsa(null)}>✕</button>
              
              <div className="expanded-header">
                <h2>{expandedBolsa.puesto}</h2>
                <span className="expanded-badge">{expandedBolsa.linea_negocio || 'General'}</span>
              </div>

              <div className="expanded-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">📋 Número de Pedido</span>
                    <span className="info-value">{expandedBolsa.numero_pedido}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🏢 Cliente</span>
                    <span className="info-value">{expandedBolsa.cliente}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📍 Ubicación</span>
                    <span className="info-value">{expandedBolsa.ubicacion}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">👥 Posiciones</span>
                    <span className="info-value">{expandedBolsa.num_posiciones || 1}</span>
                  </div>
                  {expandedBolsa.salario && (
                    <div className="info-item">
                      <span className="info-label">💰 Salario</span>
                      <span className="info-value">{expandedBolsa.salario}</span>
                    </div>
                  )}
                  {expandedBolsa.horario && (
                    <div className="info-item">
                      <span className="info-label">🕐 Horario</span>
                      <span className="info-value">{expandedBolsa.horario}</span>
                    </div>
                  )}
                </div>

                <div className="info-section">
                  <h3>📄 Descripción del Puesto</h3>
                  <p>{expandedBolsa.descripcion}</p>
                </div>

                <div className="info-section">
                  <h3>✅ Requisitos</h3>
                  <p>{expandedBolsa.requisitos}</p>
                </div>

                <div className="expanded-actions">
                  <button className="btn-action btn-primary" onClick={() => {
                    setExpandedBolsa(null)
                    handleEdit(expandedBolsa)
                  }}>
                    ✏️ Editar
                  </button>
                  <button className="btn-action btn-success">
                    📧 Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
