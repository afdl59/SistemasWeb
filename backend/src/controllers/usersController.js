const pool = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class UsersController {
  // Obtener todos los usuarios con resumen de pedidos
  async getAllUsers(req, res) {
    try {
      const [users] = await pool.query(`
        SELECT 
          u.id,
          u.nombre AS name,
          u.username,
          u.rol AS role,
          u.estado AS status,
          u.fecha_creacion AS createdAt,
          u.reset_password,
          u.temp_password,
          u.temp_password_expires,
          u.failed_attempts,
          u.locked_until,
          COUNT(DISTINCT p.id) AS pedidosCount
        FROM users u
        LEFT JOIN pedidos p ON u.id = p.owner_id
        GROUP BY u.id
        ORDER BY u.id ASC
      `);

      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Error al obtener usuarios' });
    }
  }

  // Crear nuevo usuario
  async createUser(req, res) {
    try {
      const { name, username, role, status } = req.body;

      // Validaciones
      if (!name || !username || !role) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      // Verificar si el username ya existe
      const [existing] = await pool.query(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );

      if (existing.length > 0) {
        return res.status(400).json({ message: 'El nombre de usuario ya existe' });
      }

      // Generar contraseña temporal
      const tempPassword = this.generateTempPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      // Fecha de expiración: 1 hora desde ahora
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Insertar usuario
      const [result] = await pool.query(
        `INSERT INTO users 
        (nombre, username, password, temp_password, temp_password_expires, rol, estado, reset_password, no_password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)`,
        [name, username, hashedPassword, tempPassword, expiresAt, role, status || 'active']
      );

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        userId: result.insertId,
        tempPassword: tempPassword // Solo se envía una vez
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error al crear usuario' });
    }
  }

  // Actualizar usuario
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, role, status } = req.body;

      // Proteger usuario admin
      const [user] = await pool.query('SELECT username FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user[0].username === 'admin') {
        return res.status(403).json({ message: 'El usuario Super Admin no puede ser modificado' });
      }

      // Actualizar usuario
      await pool.query(
        'UPDATE users SET nombre = ?, rol = ?, estado = ? WHERE id = ?',
        [name, role, status, id]
      );

      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error al actualizar usuario' });
    }
  }

  // Eliminar usuario
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Proteger usuario admin
      const [user] = await pool.query('SELECT username FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user[0].username === 'admin') {
        return res.status(403).json({ message: 'El usuario Super Admin no puede ser eliminado' });
      }

      // Verificar si tiene pedidos asociados
      const [pedidos] = await pool.query(
        'SELECT COUNT(*) as count FROM pedidos WHERE owner_id = ?',
        [id]
      );

      if (pedidos[0].count > 0) {
        return res.status(400).json({ 
          message: `No se puede eliminar el usuario porque tiene ${pedidos[0].count} pedido(s) asociado(s)` 
        });
      }

      // Eliminar usuario
      await pool.query('DELETE FROM users WHERE id = ?', [id]);

      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error al eliminar usuario' });
    }
  }

  // Alternar estado del usuario
  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;

      // Proteger usuario admin
      const [user] = await pool.query('SELECT username, estado FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user[0].username === 'admin') {
        return res.status(403).json({ message: 'El estado del usuario Super Admin no puede ser modificado' });
      }

      const newStatus = user[0].estado === 'active' ? 'inactive' : 'active';

      await pool.query('UPDATE users SET estado = ? WHERE id = ?', [newStatus, id]);

      res.json({ 
        message: `Usuario ${newStatus === 'active' ? 'activado' : 'desactivado'} exitosamente`,
        newStatus 
      });
    } catch (error) {
      console.error('Error toggling user status:', error);
      res.status(500).json({ message: 'Error al cambiar estado del usuario' });
    }
  }

  // Restablecer contraseña
  async resetPassword(req, res) {
    try {
      const { id } = req.params;

      // Proteger usuario admin
      const [user] = await pool.query('SELECT username FROM users WHERE id = ?', [id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      if (user[0].username === 'admin') {
        return res.status(403).json({ message: 'La contraseña del usuario Super Admin no puede ser restablecida desde aquí' });
      }

      // Generar nueva contraseña temporal
      const tempPassword = this.generateTempPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);
      
      // Fecha de expiración: 1 hora desde ahora
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1);

      // Actualizar contraseña y configurar reset
      await pool.query(
        `UPDATE users 
        SET password = ?, 
            temp_password = ?, 
            temp_password_expires = ?, 
            reset_password = 1,
            failed_attempts = 0,
            locked_until = NULL
        WHERE id = ?`,
        [hashedPassword, tempPassword, expiresAt, id]
      );

      res.json({
        message: 'Contraseña restablecida exitosamente',
        tempPassword: tempPassword // Solo se envía una vez
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Error al restablecer contraseña' });
    }
  }

  // Exportar usuarios a JSON
  async exportUsersJSON(req, res) {
    try {
      const [users] = await pool.query(`
        SELECT 
          id,
          nombre AS name,
          username,
          rol AS role,
          estado AS status,
          fecha_creacion AS createdAt
        FROM users
        ORDER BY id ASC
      `);

      res.json(users);
    } catch (error) {
      console.error('Error exporting users:', error);
      res.status(500).json({ message: 'Error al exportar usuarios' });
    }
  }

  // Generar contraseña temporal aleatoria
  generateTempPassword() {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }
}

module.exports = new UsersController();
