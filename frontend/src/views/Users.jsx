import React, { useState, useEffect } from 'react'
import { FaUserPlus, FaEdit, FaTrash, FaKey, FaPowerOff, FaDownload, FaUsers } from 'react-icons/fa'
import SideMenu from '../components/SideMenu'
import UserModal from '../components/UserModal'
import ConfirmDialog from '../components/ConfirmDialog'
import TempPasswordModal from '../components/TempPasswordModal'
import userService from '../services/userService'
import './Users.css'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [showTempPassword, setShowTempPassword] = useState(false)
  const [tempPasswordData, setTempPasswordData] = useState({ password: '', username: '', isReset: false })
  const [alert, setAlert] = useState({ show: false, message: '', type: '' })

  // Cargar usuarios al montar el componente
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await userService.getAllUsers()
      setUsers(data)
    } catch (error) {
      showAlert('Error al cargar los usuarios', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type })
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' })
    }, 4000)
  }

  const handleCreateUser = () => {
    setSelectedUser(null)
    setShowUserModal(true)
  }

  const handleEditUser = (user) => {
    if (user.username === 'admin') {
      showAlert('El usuario Super Admin no puede ser modificado', 'error')
      return
    }
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleSaveUser = async (userData) => {
    try {
      if (selectedUser) {
        // Actualizar usuario existente
        await userService.updateUser(selectedUser.id, userData)
        showAlert('Usuario actualizado correctamente', 'success')
      } else {
        // Crear nuevo usuario
        const response = await userService.createUser(userData)
        showAlert('Usuario creado correctamente', 'success')
        
        // Mostrar contraseña temporal
        if (response.tempPassword) {
          setTempPasswordData({
            password: response.tempPassword,
            username: userData.username,
            isReset: false
          })
          setShowTempPassword(true)
        }
      }
      
      setShowUserModal(false)
      setSelectedUser(null)
      loadUsers()
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error al guardar el usuario', 'error')
    }
  }

  const handleDeleteUser = (user) => {
    if (user.username === 'admin') {
      showAlert('El usuario Super Admin no puede ser eliminado', 'error')
      return
    }

    setConfirmAction({
      type: 'delete',
      user,
      title: 'Eliminar Usuario',
      message: `¿Estás seguro de que deseas eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`,
      confirmText: 'Eliminar',
      onConfirm: async () => {
        try {
          await userService.deleteUser(user.id)
          showAlert('Usuario eliminado correctamente', 'success')
          loadUsers()
        } catch (error) {
          showAlert(error.response?.data?.message || 'Error al eliminar el usuario', 'error')
        }
        setShowConfirmDialog(false)
      }
    })
    setShowConfirmDialog(true)
  }

  const handleToggleStatus = (user) => {
    if (user.username === 'admin') {
      showAlert('El estado del usuario Super Admin no puede ser modificado', 'error')
      return
    }

    const newStatus = user.status === 'active' ? 'inactivo' : 'activo'
    
    setConfirmAction({
      type: 'warning',
      user,
      title: 'Cambiar Estado de Usuario',
      message: `¿Deseas cambiar el estado del usuario "${user.name}" a ${newStatus}?`,
      confirmText: 'Cambiar Estado',
      onConfirm: async () => {
        try {
          await userService.toggleUserStatus(user.id)
          showAlert(`Usuario ${newStatus} correctamente`, 'success')
          loadUsers()
        } catch (error) {
          showAlert(error.response?.data?.message || 'Error al cambiar el estado', 'error')
        }
        setShowConfirmDialog(false)
      }
    })
    setShowConfirmDialog(true)
  }

  const handleResetPassword = (user) => {
    if (user.username === 'admin') {
      showAlert('La contraseña del usuario Super Admin no puede ser restablecida desde aquí', 'error')
      return
    }

    setConfirmAction({
      type: 'warning',
      user,
      title: 'Restablecer Contraseña',
      message: `¿Deseas restablecer la contraseña del usuario "${user.name}"? Se generará una nueva contraseña temporal.`,
      confirmText: 'Restablecer',
      onConfirm: async () => {
        try {
          const response = await userService.resetPassword(user.id)
          showAlert('Contraseña restablecida correctamente', 'success')
          
          if (response.tempPassword) {
            setTempPasswordData({
              password: response.tempPassword,
              username: user.username,
              isReset: true
            })
            setShowTempPassword(true)
          }
          
          loadUsers()
        } catch (error) {
          showAlert(error.response?.data?.message || 'Error al restablecer la contraseña', 'error')
        }
        setShowConfirmDialog(false)
      }
    })
    setShowConfirmDialog(true)
  }

  const handleExportJSON = async () => {
    try {
      const data = await userService.exportUsersJSON()
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `usuarios_${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      showAlert('Usuarios exportados correctamente', 'success')
    } catch (error) {
      showAlert('Error al exportar usuarios', 'error')
    }
  }

  const getRoleBadge = (role) => {
    const badges = {
      'Super_admin': { text: 'Super Admin', class: 'badge-super-admin' },
      'Admin': { text: 'Administrador', class: 'badge-admin' },
      'Promotor': { text: 'Promotor', class: 'badge-promotor' }
    }
    const badge = badges[role] || { text: role, class: 'badge-default' }
    return <span className={`badge ${badge.class}`}>{badge.text}</span>
  }

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="badge badge-active">Activo</span>
    ) : (
      <span className="badge badge-inactive">Inactivo</span>
    )
  }

  if (loading) {
    return (
      <div className="users-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="users-container">
      <SideMenu />
      
      {/* Alert Messages */}
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      {/* Header */}
      <div className="users-header">
        <div className="header-title">
          <FaUsers className="header-icon" />
          <h1>Gestión de Usuarios</h1>
          <span className="user-count">{users.length} usuarios</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-export" onClick={handleExportJSON}>
            <FaDownload /> Exportar JSON
          </button>
          <button className="btn btn-primary" onClick={handleCreateUser}>
            <FaUserPlus /> Crear Usuario
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Pedidos</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="user-name">{user.name}</td>
                  <td>
                    <code>{user.username}</code>
                    {user.username === 'admin' && (
                      <span className="protected-label" title="Usuario protegido">
                        🔒
                      </span>
                    )}
                  </td>
                  <td>{getRoleBadge(user.role)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td className="pedidos-count">{user.pedidosCount || 0}</td>
                  <td className="date">
                    {new Date(user.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td className="actions">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => handleEditUser(user)}
                      title="Editar usuario"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-action btn-toggle"
                      onClick={() => handleToggleStatus(user)}
                      title={user.status === 'active' ? 'Desactivar' : 'Activar'}
                    >
                      <FaPowerOff />
                    </button>
                    <button
                      className="btn-action btn-reset"
                      onClick={() => handleResetPassword(user)}
                      title="Restablecer contraseña"
                    >
                      <FaKey />
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteUser(user)}
                      title="Eliminar usuario"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={() => {
            setShowUserModal(false)
            setSelectedUser(null)
          }}
        />
      )}

      {showConfirmDialog && confirmAction && (
        <ConfirmDialog
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={confirmAction.onConfirm}
          title={confirmAction.title}
          message={confirmAction.message}
          confirmText={confirmAction.confirmText}
          type={confirmAction.type}
        />
      )}

      {showTempPassword && (
        <TempPasswordModal
          isOpen={showTempPassword}
          onClose={() => setShowTempPassword(false)}
          tempPassword={tempPasswordData.password}
          username={tempPasswordData.username}
          isReset={tempPasswordData.isReset}
        />
      )}
    </div>
  )
}
