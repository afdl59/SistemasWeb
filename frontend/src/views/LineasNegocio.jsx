import React, { useEffect, useState } from 'react'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'
import SideMenu from '../components/SideMenu'
import LineaModal from '../components/LineaModal'
import { ConfirmModal } from '../components/Modal'
import verticalService from '../services/verticalService'
import './LineasNegocio.css'

export default function LineasNegocio() {
    const [lineas, setLineas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [editingLinea, setEditingLinea] = useState(null)
    const [deletingLinea, setDeletingLinea] = useState(null)

    useEffect(() => {
        loadLineas()
    }, [])

    const loadLineas = async () => {
        try {
            setLoading(true)
            const data = await verticalService.getAllVerticales()
            setLineas(data)
            setError('')
        } catch (err) {
            console.error('Error cargando líneas:', err)
            setError('Error al cargar las líneas de negocio')
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setShowCreateModal(true)
    }

    const handleEdit = (linea) => {
        setEditingLinea(linea)
    }

    const handleSave = async (lineaData) => {
        try {
            if (editingLinea) {
                await verticalService.updateVertical(editingLinea.id, lineaData)
                setEditingLinea(null)
            } else {
                await verticalService.createVertical(lineaData)
                setShowCreateModal(false)
            }
            loadLineas()
        } catch (err) {
            console.error('Error guardando línea:', err)
            setError(err.message || 'Error al guardar la línea de negocio')
        }
    }

    const handleDelete = (linea) => {
        setDeletingLinea(linea)
    }

    const handleConfirmDelete = async () => {
        if (deletingLinea) {
            try {
                await verticalService.deleteVertical(deletingLinea.id)
                setDeletingLinea(null)
                loadLineas()
            } catch (err) {
                console.error('Error eliminando línea:', err)
                setError(err.message || 'Error al eliminar la línea de negocio')
                setDeletingLinea(null)
            }
        }
    }

    if (loading) return <div className="loading">Cargando líneas de negocio...</div>

    return (
        <div className="lineas-page">
            <SideMenu />
            <div className="lineas-table-container">
                <div className="lineas-header">
                    <h1>Gestión de Líneas de Negocio</h1>
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
                            <tr key={linea.id}>
                                <td className="linea-name">{linea.nombre}</td>
                                <td>
                                    <span className="status-badge active">Activa</span>
                                </td>
                                <td><span className="pedidos-count pedidos-abiertos">0</span></td>
                                <td><span className="pedidos-count">0</span></td>
                                <td className="descripcion-cell"><span className="descripcion-text">-</span></td>
                                <td className="actions-cell">
                                    <button className="btn btn-sm btn-secondary" onClick={() => handleEdit(linea)} title="Editar línea">
                                        <FaEdit />
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
            </div>
        </div>
    )
}

