# Sistema de Gestión de Usuarios - CRM

Sistema completo de gestión de usuarios con autenticación, roles y permisos para un CRM empresarial.

## 🚀 Características

### Frontend
- ✅ Interfaz moderna con React + Vite
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Sistema de roles (Super Admin, Admin, Promotor)
- ✅ Control de estado de usuarios (Activo/Inactivo)
- ✅ Restablecimiento de contraseñas con contraseñas temporales
- ✅ Exportación de datos a JSON
- ✅ Diseño responsive
- ✅ Alertas con animaciones

### Backend
- ✅ API REST con Node.js + Express
- ✅ Base de datos MySQL
- ✅ Autenticación con bcrypt
- ✅ Contraseñas temporales con expiración
- ✅ Protección del usuario Super Admin
- ✅ Validación de datos
- ✅ Sistema de bloqueo por intentos fallidos

## 📋 Requisitos Previos

- Node.js 16+ 
- MySQL 8+
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd SistemasWeb
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

Editar `.env` con tus credenciales de MySQL:
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=crm_database
```

### 3. Configurar Base de Datos

Ejecutar el script SQL para crear la base de datos y tablas:

```bash
mysql -u root -p < database/schema.sql
```

O manualmente:
1. Abrir MySQL Workbench o terminal MySQL
2. Ejecutar el contenido de `backend/database/schema.sql`

### 4. Generar hash de contraseña para Super Admin

El script SQL incluye un placeholder para la contraseña del Super Admin. Debes generar el hash real:

```bash
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('Admin123!', 10, (err, hash) => console.log(hash));"
```

Actualizar la línea en `schema.sql` con el hash generado antes de ejecutar el script.

### 5. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env` en `frontend/`:
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Ejecución

### Backend
```bash
cd backend
npm run dev
```
El servidor estará disponible en `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
SistemasWeb/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UserModal.jsx          # Modal de crear/editar usuario
│   │   │   ├── ConfirmDialog.jsx      # Diálogo de confirmación
│   │   │   └── TempPasswordModal.jsx  # Modal de contraseña temporal
│   │   ├── views/
│   │   │   └── Users.jsx              # Vista principal de usuarios
│   │   ├── services/
│   │   │   └── userService.js         # Servicio de API de usuarios
│   │   └── routes/
│   │       └── index.jsx              # Configuración de rutas
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js            # Configuración de MySQL
│   │   ├── controllers/
│   │   │   └── usersController.js     # Lógica de negocio
│   │   ├── routes/
│   │   │   └── users.js               # Rutas de API
│   │   ├── app.js                     # Configuración Express
│   │   └── server.js                  # Inicio del servidor
│   ├── database/
│   │   └── schema.sql                 # Schema de base de datos
│   ├── .env.example
│   └── package.json
└── README_USERS.md
```

## 🔐 Sistema de Usuarios

### Roles

1. **Super Admin**
   - Usuario: `admin`
   - Acceso completo al sistema
   - No puede ser modificado ni eliminado desde la interfaz
   - Debe gestionarse directamente en la base de datos

2. **Admin**
   - Puede gestionar usuarios
   - Puede ver todas las oportunidades
   - Acceso a configuración del sistema

3. **Promotor**
   - Usuario estándar
   - Acceso limitado a sus propias oportunidades
   - No puede gestionar usuarios

### Contraseñas Temporales

- Se generan automáticamente al crear usuarios
- Expiran en 1 hora
- El usuario debe cambiarla en el primer login
- Se pueden restablecer desde la interfaz

### Estados de Usuario

- **Activo**: Puede acceder al sistema
- **Inactivo**: No puede acceder al sistema

### Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Bloqueo automático tras intentos fallidos
- Protección del usuario Super Admin
- Validación de datos en frontend y backend

## 📡 API Endpoints

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| POST | `/api/users` | Crear nuevo usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |
| POST | `/api/users/:id/toggle-status` | Cambiar estado activo/inactivo |
| POST | `/api/users/:id/reset-password` | Restablecer contraseña |
| GET | `/api/users/export/json` | Exportar usuarios a JSON |

### Ejemplo de Respuesta

```json
{
  "id": 1,
  "name": "Juan Pérez",
  "username": "jperez",
  "role": "Admin",
  "status": "active",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "pedidosCount": 5
}
```

## 🎨 Características de UI

- Diseño con gradiente morado (#667eea → #764ba2)
- Badges de colores por rol y estado
- Alertas con animación de fadeIn/fadeOut
- Modales con overlay y animación slideUp
- Tabla responsive
- Botones de acción con iconos Font Awesome
- Diseño mobile-first

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- Vite
- React Router DOM
- React Icons (Font Awesome)
- Axios
- CSS3 (Flexbox, Grid, Animations)

### Backend
- Node.js
- Express
- MySQL2 (Promise-based)
- bcrypt
- dotenv
- cors

## 📝 Notas Importantes

1. **Primera Ejecución**: Asegúrate de ejecutar el script SQL antes de iniciar el backend
2. **Super Admin**: Cambia la contraseña del usuario `admin` en producción
3. **Variables de Entorno**: No commitear archivos `.env` al repositorio
4. **Puerto 3000**: Asegúrate de que el puerto 3000 esté disponible para el backend
5. **Puerto 5173**: Puerto por defecto de Vite para el frontend

## 🐛 Solución de Problemas

### Error de conexión a MySQL
```bash
# Verifica que MySQL esté corriendo
mysql -u root -p

# Verifica las credenciales en .env
```

### Error "Cannot find module"
```bash
# Reinstala dependencias
npm install
```

### CORS Error
```bash
# Verifica que VITE_API_URL en frontend/.env coincida con la URL del backend
# Verifica que ALLOWED_ORIGINS en backend/.env incluya la URL del frontend
```

## 📄 Licencia

ISC

## 👥 Contribuidores

Sistema desarrollado para la gestión de usuarios del CRM empresarial.
