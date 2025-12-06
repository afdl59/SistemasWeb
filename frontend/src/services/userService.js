const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const userService = {
  // Obtener todos los usuarios
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`)
      if (!response.ok) throw new Error('Error al obtener usuarios')
      return await response.json()
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      throw error
    }
  },

  // Crear nuevo usuario
  createUser: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error('Error al crear usuario')
      return await response.json()
    } catch (error) {
      console.error('Error al crear usuario:', error)
      throw error
    }
  },

  // Actualizar usuario existente
  updateUser: async (id, userData) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!response.ok) throw new Error('Error al actualizar usuario')
      return await response.json()
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      throw error
    }
  },

  // Eliminar usuario
  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error al eliminar usuario')
      return await response.json()
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      throw error
    }
  },

  // Alternar estado del usuario (activo/inactivo)
  toggleUserStatus: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}/toggle-status`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Error al cambiar estado del usuario')
      return await response.json()
    } catch (error) {
      console.error('Error al cambiar estado del usuario:', error)
      throw error
    }
  },

  // Restablecer contraseña
  resetPassword: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${id}/reset-password`, {
        method: 'POST'
      })
      if (!response.ok) throw new Error('Error al restablecer contraseña')
      return await response.json()
    } catch (error) {
      console.error('Error al restablecer contraseña:', error)
      throw error
    }
  },

  // Exportar usuarios a JSON
  exportUsersJSON: async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/export/json`)
      if (!response.ok) throw new Error('Error al exportar usuarios')
      return await response.json()
    } catch (error) {
      console.error('Error al exportar usuarios:', error)
      throw error
    }
  }
}

export default userService
