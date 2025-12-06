-- MySQL dump - Base de datos sistemasweb
-- Servidor: localhost
-- Generado el: 2024-12-06
-- Versión del servidor: 8.0.x
-- Versión de PHP: 8.x

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemasweb`
--

CREATE DATABASE IF NOT EXISTS `sistemasweb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sistemasweb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reset_password` tinyint(1) DEFAULT '1' COMMENT 'Indica si debe cambiar contraseña en próximo login',
  `rol` enum('Admin','Super_admin','Promotor') COLLATE utf8mb4_unicode_ci DEFAULT 'Promotor',
  `estado` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `temp_password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Contraseña temporal en texto plano',
  `temp_password_expires` datetime DEFAULT NULL COMMENT 'Fecha de expiración de contraseña temporal',
  `no_password` tinyint(1) DEFAULT '0' COMMENT 'Usuario sin contraseña asignada',
  `failed_attempts` int DEFAULT '0' COMMENT 'Intentos fallidos de login',
  `locked_until` datetime DEFAULT NULL COMMENT 'Usuario bloqueado hasta esta fecha',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_username` (`username`),
  KEY `idx_rol` (`rol`),
  KEY `idx_estado` (`estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `idx_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `verticales`
--

CREATE TABLE `verticales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `idx_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nif` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `owner_id` int NOT NULL COMMENT 'Usuario propietario del pedido',
  `provincia_id` int DEFAULT NULL,
  `vertical_id` int DEFAULT NULL,
  `estado` enum('Presentada','Denegada','Evolucionada','Ganada') COLLATE utf8mb4_unicode_ci DEFAULT 'Presentada',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `fk_pedidos_owner` (`owner_id`),
  KEY `fk_pedidos_provincia` (`provincia_id`),
  KEY `fk_pedidos_vertical` (`vertical_id`),
  KEY `idx_estado` (`estado`),
  KEY `idx_fecha_creacion` (`fecha_creacion`),
  CONSTRAINT `fk_pedidos_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_provincia` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_pedidos_vertical` FOREIGN KEY (`vertical_id`) REFERENCES `verticales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
