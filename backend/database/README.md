# Configuración de la Base de Datos

## Requisitos Previos

- **MySQL 8.0 o superior** instalado
- Acceso con usuario root o un usuario con permisos para crear bases de datos

## Instalación de MySQL (Windows)

Si no tienes MySQL instalado:

1. Descarga MySQL Installer desde: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador y selecciona "Developer Default"
3. Durante la instalación, configura la contraseña para el usuario root
4. Asegúrate de que MySQL Server esté en el PATH del sistema

## Configuración Automática (Recomendado)

### Opción 1: PowerShell Script

```powershell
cd backend/database
.\setup-db.ps1
```

El script te pedirá:
- Usuario de MySQL (default: root)
- Contraseña de MySQL
- Creará la base de datos `sistemasweb`
- Ejecutará el schema (tablas)
- Insertará los datos iniciales (provincias y verticales)

### Opción 2: Manual con MySQL Workbench

1. Abre MySQL Workbench
2. Conecta a tu servidor local
3. Abre el archivo `schema.sql`
4. Ejecuta el script completo
5. Abre el archivo `seed.sql`
6. Ejecuta el script completo

### Opción 3: Manual con línea de comandos

```bash
# Conectar a MySQL
mysql -u root -p

# Crear la base de datos y ejecutar schema
mysql -u root -p < backend/database/schema.sql

# Insertar datos iniciales
mysql -u root -p sistemasweb < backend/database/seed.sql
```

## Configurar archivo .env

Después de crear la base de datos, actualiza el archivo `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# Database MySQL
DB_HOST=localhost
DB_PORT=3306
DB_NAME=sistemasweb
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql

# JWT
JWT_SECRET=sistemasweb_secret_key_2024
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Verificar la Instalación

```sql
-- Conectar a MySQL
mysql -u root -p

-- Usar la base de datos
USE sistemasweb;

-- Verificar tablas
SHOW TABLES;

-- Verificar datos iniciales
SELECT COUNT(*) FROM provincias;  -- Debería ser 52
SELECT COUNT(*) FROM verticales;  -- Debería ser 15

-- Verificar estructura de pedidos
DESCRIBE pedidos;
```

## Estructura de la Base de Datos

### Tabla: users
- Almacena los usuarios del sistema
- Roles: Admin, Super_admin, Promotor
- Estados: active, inactive

### Tabla: provincias
- 52 provincias de España (incluye Ceuta y Melilla)
- Solo lectura

### Tabla: verticales
- Líneas de negocio / sectores
- 15 verticales predefinidas
- Solo lectura

### Tabla: pedidos
- Pedidos/Propuestas del CRM
- Estados: Presentada, Denegada, Evolucionada, Ganada
- Relaciones con users, provincias, verticales

## Solución de Problemas

### Error: "Access denied for user"
```bash
# Verificar que la contraseña sea correcta
mysql -u root -p
```

### Error: "Can't connect to MySQL server"
```bash
# Verificar que MySQL esté corriendo
net start MySQL80

# O desde servicios de Windows
services.msc
```

### Error: "Database already exists"
```sql
-- Eliminar base de datos existente (CUIDADO: borra todos los datos)
DROP DATABASE IF EXISTS sistemasweb;

-- Volver a ejecutar schema.sql
```

### Recrear la base de datos desde cero
```sql
DROP DATABASE IF EXISTS sistemasweb;
```
Luego ejecuta nuevamente `setup-db.ps1` o los scripts manuales.

## Datos de Prueba

Si quieres agregar un usuario de prueba:

```sql
USE sistemasweb;

INSERT INTO users (nombre, username, password, rol, estado) VALUES
('Usuario Admin', 'admin', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'Super_admin', 'active');
```

Nota: La contraseña debe estar hasheada con bcrypt. Usa la aplicación para crear usuarios.
