# 🚀 Sistema CRM - Gestión Empresarial

Sistema CRM completo desarrollado con React, Node.js y MySQL para la gestión integral de clientes, usuarios, líneas de negocio y más.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración de Base de Datos](#configuración-de-base-de-datos)
- [Iniciar el Proyecto](#iniciar-el-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [API Endpoints](#api-endpoints)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- 🔐 Sistema de autenticación y autorización con roles
- 👥 Gestión completa de clientes con perfiles detallados
- 📊 Dashboard con métricas y estadísticas en tiempo real
- 📄 Gestión de facturas, contratos y pagos
- 📅 Sistema de reuniones y seguimiento
- 🎫 Gestión de incidencias y tickets de soporte
- 👤 Administración de usuarios con diferentes roles
- 🏢 Gestión de líneas de negocio
- 💼 Bolsa de trabajo integrada
- 📱 Diseño responsive y moderno
- 🎨 Interfaz con gradientes corporativos cyan/green

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- React Router DOM
- Vite
- CSS3 con gradientes modernos
- React Icons
- Axios

### Backend
- Node.js
- Express.js
- MySQL 2
- bcryptjs (encriptación de contraseñas)
- jsonwebtoken (JWT)
- cors
- dotenv

### Base de Datos
- MySQL 8.0+

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MySQL](https://www.mysql.com/) (v8.0 o superior)
- [Git](https://git-scm.com/)
- Un editor de código (recomendado: VS Code)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/afdl59/SistemasWeb.git
cd SistemasWeb
```

### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../frontend
npm install
```

### 4. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=crm_db
JWT_SECRET=tu_clave_secreta_super_segura
```

## 🗄️ Configuración de Base de Datos

La instalación de la base de datos se realiza en **tres pasos**:

### 1. Crear el esquema principal

Ejecuta el archivo `schema.sql` para crear la estructura de la base de datos:

```bash
mysql -u root -p < backend/database/schema.sql
```

### 2. Aplicar correcciones

Ejecuta el archivo `fix_enums.sql` para corregir las enumeraciones:

```bash
mysql -u root -p crm_db < backend/database/fix_enums.sql
```

### 3. Migrar datos de clientes

Ejecuta la migración para la estructura completa de clientes:

```bash
mysql -u root -p crm_db < backend/database/migration_clientes.sql
```

**Nota:** Asegúrate de ejecutar los archivos en este orden específico para evitar errores.

### Datos de prueba (opcional)

Si deseas cargar datos de ejemplo:

```bash
mysql -u root -p crm_db < backend/database/seed.sql
```

## 🚀 Iniciar el Proyecto

### Opción 1: Iniciar Backend y Frontend por separado

**Terminal 1 - Backend:**
```bash
cd backend
node src/server.js
```

El servidor backend se iniciará en `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

El servidor frontend se iniciará en `http://localhost:5173`

### Opción 2: Usar scripts concurrentes (si está configurado)

```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
SistemasWeb/
├── backend/
│   ├── database/
│   │   ├── schema.sql
│   │   ├── fix_enums.sql
│   │   ├── migration_clientes.sql
│   │   └── seed.sql
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   ├── services/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
└── README.md
```

## 🎯 Funcionalidades

### 👤 Gestión de Usuarios
- Crear, editar y eliminar usuarios
- Asignar roles (Super Admin, Admin, Promotor)
- Activar/Desactivar usuarios
- Restablecer contraseñas
- Exportar usuarios a JSON

### 👥 Gestión de Clientes
- CRUD completo de clientes
- Vista detallada por cliente con tabs:
  - Datos básicos
  - Facturas
  - Contratos
  - Historial de pagos
  - Reuniones
  - Incidencias
- Ordenamiento alfabético con activos primero
- Gestión de contactos por cliente

### 📊 Dashboard
- Métricas de facturación
- Facturas pendientes y vencidas
- Pagos retrasados
- Visualización en tiempo real

### 🏢 Líneas de Negocio
- Gestión de diferentes áreas de la empresa
- Asignación de clientes a líneas

### 💼 Bolsa de Trabajo
- Publicación de vacantes
- Gestión de aplicaciones

### ⚙️ Configuración
- Perfil de usuario
- Cambio de contraseña
- Preferencias del sistema

## 🔌 API Endpoints

### Autenticación
```
POST   /api/auth/login           - Iniciar sesión
POST   /api/auth/change-password - Cambiar contraseña
```

### Usuarios
```
GET    /api/users                - Listar usuarios
POST   /api/users                - Crear usuario
PUT    /api/users/:id            - Actualizar usuario
DELETE /api/users/:id            - Eliminar usuario
PUT    /api/users/:id/toggle     - Activar/Desactivar
POST   /api/users/:id/reset      - Restablecer contraseña
```

### Clientes
```
GET    /api/clientes             - Listar clientes
GET    /api/clientes/:id         - Obtener cliente
POST   /api/clientes             - Crear cliente
PUT    /api/clientes/:id         - Actualizar cliente
DELETE /api/clientes/:id         - Eliminar cliente
```

### Facturas, Contratos, Pagos, etc.
```
GET/POST/PUT/DELETE  /api/clientes/:id/facturas
GET/POST/PUT/DELETE  /api/clientes/:id/contratos
GET/POST/PUT/DELETE  /api/clientes/:id/pagos
GET/POST/PUT/DELETE  /api/clientes/:id/reuniones
GET/POST/PUT/DELETE  /api/clientes/:id/tickets
```

## 👨‍💻 Usuario por Defecto

Después de ejecutar los scripts de base de datos, puedes iniciar sesión con:

- **Usuario:** `admin`
- **Contraseña:** `admin123`

**⚠️ IMPORTANTE:** Cambia esta contraseña inmediatamente en producción.

## 🎨 Estilos y Diseño

El sistema utiliza un esquema de colores corporativo basado en gradientes:

- **Primario:** Cyan (#0ea5e9) → Teal (#06b6d4) → Green (#10b981)
- **Fondos:** Gradientes suaves de cyan y green
- **Alertas:** Verde para éxito, Rojo para errores
- **Badges:** Colores semánticos según estado

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Alejandro Figari** - [@afdl59](https://github.com/afdl59)

Link del proyecto: [https://github.com/afdl59/SistemasWeb](https://github.com/afdl59/SistemasWeb)

---

⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub!
