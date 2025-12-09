const pool = require('../config/database');
const bcrypt = require('bcrypt');

class AuthController {
  // Login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos' });
      }

      // Buscar usuario
      const [users] = await pool.query(
        'SELECT id, nombre, username, password, rol, estado, reset_password, temp_password_expires, locked_until, failed_attempts FROM users WHERE username = ?',
        [username]
      );

      if (users.length === 0) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      const user = users[0];

      // Verificar si el usuario está inactivo
      if (user.estado === 'inactive') {
        return res.status(403).json({ message: 'Usuario inactivo. Contacte al administrador.' });
      }

      // Verificar si la cuenta está bloqueada
      if (user.locked_until && new Date(user.locked_until) > new Date()) {
        const minutesLeft = Math.ceil((new Date(user.locked_until) - new Date()) / 60000);
        return res.status(403).json({ 
          message: `Cuenta bloqueada. Intente nuevamente en ${minutesLeft} minuto(s).` 
        });
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Incrementar intentos fallidos
        const newFailedAttempts = (user.failed_attempts || 0) + 1;
        
        if (newFailedAttempts >= 5) {
          // Bloquear cuenta por 15 minutos
          const lockUntil = new Date();
          lockUntil.setMinutes(lockUntil.getMinutes() + 15);
          
          await pool.query(
            'UPDATE users SET failed_attempts = ?, locked_until = ? WHERE id = ?',
            [newFailedAttempts, lockUntil, user.id]
          );
          
          return res.status(403).json({ 
            message: 'Cuenta bloqueada por múltiples intentos fallidos. Intente nuevamente en 15 minutos.' 
          });
        } else {
          await pool.query(
            'UPDATE users SET failed_attempts = ? WHERE id = ?',
            [newFailedAttempts, user.id]
          );
          
          return res.status(401).json({ 
            message: `Credenciales inválidas. Intentos restantes: ${5 - newFailedAttempts}` 
          });
        }
      }

      // Verificar si necesita cambiar contraseña (contraseña temporal)
      if (user.reset_password === 1) {
        // Verificar si la contraseña temporal ha expirado
        if (user.temp_password_expires && new Date(user.temp_password_expires) < new Date()) {
          return res.status(403).json({ 
            message: 'La contraseña temporal ha expirado. Contacte al administrador.',
            expired: true
          });
        }

        // Contraseña temporal válida - requiere cambio
        return res.status(200).json({
          requirePasswordChange: true,
          userId: user.id,
          username: user.username,
          nombre: user.nombre,
          message: 'Debe cambiar su contraseña temporal'
        });
      }

      // Login exitoso - resetear intentos fallidos
      await pool.query(
        'UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = ?',
        [user.id]
      );

      // Devolver datos del usuario
      res.json({
        success: true,
        user: {
          id: user.id,
          nombre: user.nombre,
          username: user.username,
          rol: user.rol
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  }

  // Cambiar contraseña desde contraseña temporal
  async changePassword(req, res) {
    try {
      const { userId, newPassword } = req.body;

      if (!userId || !newPassword) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
      }

      // Validar longitud de contraseña
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
      }

      // Verificar que el usuario existe y tiene reset_password = 1
      const [users] = await pool.query(
        'SELECT id, reset_password, temp_password_expires FROM users WHERE id = ?',
        [userId]
      );

      if (users.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const user = users[0];

      if (user.reset_password !== 1) {
        return res.status(403).json({ message: 'No tiene autorización para cambiar la contraseña' });
      }

      // Verificar si la contraseña temporal ha expirado
      if (user.temp_password_expires && new Date(user.temp_password_expires) < new Date()) {
        return res.status(403).json({ 
          message: 'La contraseña temporal ha expirado. Contacte al administrador.' 
        });
      }

      // Hashear nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar contraseña y limpiar campos temporales
      await pool.query(
        `UPDATE users 
        SET password = ?, 
            reset_password = 0,
            temp_password = NULL,
            temp_password_expires = NULL,
            failed_attempts = 0,
            locked_until = NULL
        WHERE id = ?`,
        [hashedPassword, userId]
      );

      res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente. Puede iniciar sesión con su nueva contraseña.'
      });
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      res.status(500).json({ message: 'Error al cambiar contraseña' });
    }
  }
}

module.exports = new AuthController();
