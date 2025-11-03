import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa'
import SideMenu from '../components/SideMenu'
import LineaModal from '../components/LineaModal'
import { ConfirmModal } from '../components/Modal'
import './LineasNegocio.css'

// Simple Lines of Business view with local placeholder data and inline edit modal
export default function LineasNegocio() {
    // Placeholder data until backend is connected
    const PLACEHOLDER = [
        { id: 1, nombre: 'Logística', descripcion: 'Almacén y transporte', activo: true, pedidos_abiertos: 12, total_pedidos: 120, ultima: '2025-10-31' },
        { id: 2, nombre: 'Industrial', descripcion: 'Operarios producción', activo: true, pedidos_abiertos: 8, total_pedidos: 80, ultima: '2025-10-30' },
        { id: 3, nombre: 'Retail', descripcion: 'Tiendas y comercio', activo: false, pedidos_abiertos: 0, total_pedidos: 45, ultima: '2025-10-29' }
    ]

    const [lineas, setLineas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingLinea, setEditingLinea] = useState(null)
    const [deletingLinea, setDeletingLinea] = useState(null)
    const [togglingLinea, setTogglingLinea] = useState(null)

    useEffect(() => {
        // simulate load
        const t = setTimeout(() => {
            setLineas(PLACEHOLDER)
            setLoading(false)
        }, 200)
        return () => clearTimeout(t)
    }, [])

    const handleCreate = () => {
        setShowCreateModal(true)
    }

    const handleEdit = (linea) => {
        setEditingLinea(linea)
    }

    const handleSave = (lineaData) => {
        if (editingLinea) {
            setLineas(prev => prev.map(l => l.id === editingLinea.id ? { ...l, ...lineaData } : l))
            setEditingLinea(null)
        } else {
            setLineas(prev => [lineaData, ...prev])
            setShowCreateModal(false)
        }
    }

    const handleToggleStatus = (linea) => {
        setTogglingLinea(linea)
    }

    const handleConfirmToggle = () => {
        if (togglingLinea) {
            setLineas(prev => prev.map(l => l.id === togglingLinea.id ? { ...l, activo: !l.activo } : l))
            setTogglingLinea(null)
        }
    }

    const handleDelete = (linea) => {
        setDeletingLinea(linea)
    }

    const handleConfirmDelete = () => {
        if (deletingLinea) {
            setLineas(prev => prev.filter(l => l.id !== deletingLinea.id))
            setDeletingLinea(null)
        }
    }

    if (loading) return <div className="loading">Cargando líneas de negocio...</div>

    return (
        <div className="lineas-page">
            <SideMenu />
            <div className="lineas-table-container">
                <div className="lineas-header">
                    <h1>📊 Gestión de Líneas de Negocio</h1>
                    <button className="btn btn-primary" onClick={handleCreate}>
                        <FaPlus /> Crear Línea de Negocio
                    </button>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <table className="lineas-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Pedidos Abiertos</th>
                            <th>Total Pedidos</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineas.map(linea => (
                            <tr key={linea.id} className={!linea.activo ? 'inactive-row' : ''}>
                                <td className="linea-name">{linea.nombre}</td>
                                <td>
                                    <span className={`status-badge ${linea.activo ? 'active' : 'inactive'}`}>
                                        {linea.activo ? 'Activa' : 'Inactiva'}
                                    </span>
                                </td>
                                <td><span className="pedidos-count pedidos-abiertos">{linea.pedidos_abiertos}</span></td>
                                <td><span className="pedidos-count">{linea.total_pedidos}</span></td>
                                <td className="descripcion-cell"><span className="descripcion-text">{linea.descripcion}</span></td>
                                <td className="actions-cell">
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(linea)} title="Editar línea">
                                        <FaEdit />
                                    </button>
                                    <button 
                                        className={`btn btn-sm ${linea.activo ? 'btn-warning' : 'btn-success'}`} 
                                        onClick={() => handleToggleStatus(linea)} 
                                        title={linea.activo ? 'Desactivar' : 'Activar'}
                                    >
                                        {linea.activo ? <FaToggleOff /> : <FaToggleOn />}
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(linea)} title="Eliminar">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {lineas.length === 0 && (
                    <div className="no-lineas">
                        <h3>📋 No hay líneas de negocio</h3>
                        <p>Empieza creando tu primera línea de negocio</p>
                        <button className="btn btn-primary" onClick={handleCreate}>
                            <FaPlus /> Crear Primera Línea
                        </button>
                    </div>
                )}

                {/* Modales */}
                <LineaModal
                    isOpen={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    onSave={handleSave}
                />

                <LineaModal
                    isOpen={!!editingLinea}
                    onClose={() => setEditingLinea(null)}
                    onSave={handleSave}
                    linea={editingLinea}
                />

                <ConfirmModal
                    isOpen={!!deletingLinea}
                    onClose={() => setDeletingLinea(null)}
                    onConfirm={handleConfirmDelete}
                    title="⚠️ Eliminar Línea de Negocio"
                    message={`¿Estás seguro de que quieres eliminar la línea "${deletingLinea?.nombre}"? Esta acción no se puede deshacer.`}
                    confirmText="Sí, eliminar"
                    cancelText="Cancelar"
                    isDanger={true}
                />

                <ConfirmModal
                    isOpen={!!togglingLinea}
                    onClose={() => setTogglingLinea(null)}
                    onConfirm={handleConfirmToggle}
                    title={togglingLinea?.activo ? '🔴 Desactivar Línea' : '🟢 Activar Línea'}
                    message={`¿Cambiar el estado de "${togglingLinea?.nombre}" a ${togglingLinea?.activo ? 'INACTIVA' : 'ACTIVA'}?`}
                    confirmText="Sí, cambiar"
                    cancelText="Cancelar"
                    isDanger={false}
                />
            </div>
        </div>
    )
}

