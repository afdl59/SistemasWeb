# Script para configurar la base de datos MySQL

Write-Host "=== Configuración de Base de Datos SistemasWeb ===" -ForegroundColor Cyan
Write-Host ""

# Verificar si MySQL está instalado
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if (-not $mysqlPath) {
    Write-Host "Error: MySQL no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor instala MySQL desde: https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
    exit 1
}

Write-Host "MySQL encontrado en: $($mysqlPath.Source)" -ForegroundColor Green
Write-Host ""

# Solicitar credenciales
$dbUser = Read-Host "Usuario MySQL (default: root)"
if ([string]::IsNullOrWhiteSpace($dbUser)) {
    $dbUser = "root"
}

$dbPassword = Read-Host "Contraseña MySQL (dejar vacío si no tiene)" -AsSecureString
$dbPasswordPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($dbPassword))

Write-Host ""
Write-Host "Creando base de datos..." -ForegroundColor Cyan

# Ejecutar schema.sql
$schemaPath = Join-Path $PSScriptRoot "schema.sql"
if (Test-Path $schemaPath) {
    if ([string]::IsNullOrWhiteSpace($dbPasswordPlain)) {
        mysql -u $dbUser < $schemaPath 2>&1
    } else {
        mysql -u $dbUser -p"$dbPasswordPlain" < $schemaPath 2>&1
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Schema creado correctamente" -ForegroundColor Green
    } else {
        Write-Host "✗ Error al crear el schema" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ No se encontró schema.sql" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Insertando datos iniciales..." -ForegroundColor Cyan

# Ejecutar seed.sql
$seedPath = Join-Path $PSScriptRoot "seed.sql"
if (Test-Path $seedPath) {
    if ([string]::IsNullOrWhiteSpace($dbPasswordPlain)) {
        mysql -u $dbUser sistemasweb < $seedPath 2>&1
    } else {
        mysql -u $dbUser -p"$dbPasswordPlain" sistemasweb < $seedPath 2>&1
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Datos iniciales insertados correctamente" -ForegroundColor Green
    } else {
        Write-Host "✗ Error al insertar datos iniciales" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ No se encontró seed.sql" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Configuración completada ===" -ForegroundColor Green
Write-Host ""
Write-Host "Recuerda actualizar el archivo .env con tus credenciales:" -ForegroundColor Yellow
Write-Host "DB_USER=$dbUser" -ForegroundColor Gray
Write-Host "DB_PASSWORD=tu_contraseña" -ForegroundColor Gray
Write-Host ""
