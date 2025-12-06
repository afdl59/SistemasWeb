-- Migración: Añadir tablas de clientes
-- Fecha: 2024-12-06
-- Base de datos: sistemasweb

USE `sistemasweb`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cif` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `linea` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Línea de negocio o vertical',
  `activo` tinyint(1) DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_nombre` (`nombre`),
  KEY `idx_cif` (`cif`),
  KEY `idx_activo` (`activo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_contactos`
--

CREATE TABLE IF NOT EXISTS `cliente_contactos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cargo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_contactos_cliente` (`cliente_id`),
  CONSTRAINT `fk_contactos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_facturas`
--

CREATE TABLE IF NOT EXISTS `cliente_facturas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `numero` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Formato DD/MM/YYYY',
  `importe` decimal(10,2) DEFAULT '0.00',
  `estado` enum('Pagada','Pendiente','Vencida') COLLATE utf8mb4_unicode_ci DEFAULT 'Pendiente',
  `metodo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Método de pago',
  PRIMARY KEY (`id`),
  KEY `fk_facturas_cliente` (`cliente_id`),
  KEY `idx_numero` (`numero`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `fk_facturas_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_contratos`
--

CREATE TABLE IF NOT EXISTS `cliente_contratos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `numero` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inicio` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Formato DD/MM/YYYY',
  `fin` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Formato DD/MM/YYYY',
  `importe` decimal(10,2) DEFAULT '0.00',
  `estado` enum('Vigente','Finalizado','Cancelado') COLLATE utf8mb4_unicode_ci DEFAULT 'Vigente',
  PRIMARY KEY (`id`),
  KEY `fk_contratos_cliente` (`cliente_id`),
  KEY `idx_numero` (`numero`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `fk_contratos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_pagos`
--

CREATE TABLE IF NOT EXISTS `cliente_pagos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `factura` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Número de factura asociada',
  `fecha_pago` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Formato DD/MM/YYYY',
  `importe` decimal(10,2) NOT NULL DEFAULT '0.00',
  `metodo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Transferencia, Tarjeta, Efectivo, etc.',
  `fecha_limite` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Fecha límite de pago',
  `retraso` int DEFAULT '0' COMMENT 'Días de retraso',
  `estado` enum('Pagado','Retrasado','Impagado') COLLATE utf8mb4_unicode_ci DEFAULT 'Pagado',
  PRIMARY KEY (`id`),
  KEY `fk_pagos_cliente` (`cliente_id`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `fk_pagos_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_reuniones`
--

CREATE TABLE IF NOT EXISTS `cliente_reuniones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `fecha` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Formato DD/MM/YYYY - HH:MM',
  `tipo` enum('Videollamada','Reunión presencial','Llamada','Seguimiento') COLLATE utf8mb4_unicode_ci DEFAULT 'Videollamada',
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `participantes` text COLLATE utf8mb4_unicode_ci COMMENT 'Lista de participantes',
  `estado` enum('Programada','Realizada','Cancelada','Reprogramada') COLLATE utf8mb4_unicode_ci DEFAULT 'Programada',
  PRIMARY KEY (`id`),
  KEY `fk_reuniones_cliente` (`cliente_id`),
  KEY `idx_estado` (`estado`),
  CONSTRAINT `fk_reuniones_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_feedbacks`
--

CREATE TABLE IF NOT EXISTS `cliente_feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `fecha` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Formato DD/MM/YYYY',
  `origen` enum('Encuesta','Llamada','Reunión','Ticket resuelto','Otro') COLLATE utf8mb4_unicode_ci DEFAULT 'Encuesta',
  `valor` int DEFAULT '5' COMMENT 'Valoración de 1 a 10',
  `categoria` enum('Atención','Tiempo de respuesta','Calidad del servicio','Precio','Otro') COLLATE utf8mb4_unicode_ci DEFAULT 'Atención',
  `comentario` text COLLATE utf8mb4_unicode_ci,
  `nivel` enum('Alto','Medio','Bajo') COLLATE utf8mb4_unicode_ci DEFAULT 'Medio',
  PRIMARY KEY (`id`),
  KEY `fk_feedbacks_cliente` (`cliente_id`),
  KEY `idx_nivel` (`nivel`),
  CONSTRAINT `fk_feedbacks_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_tickets`
--

CREATE TABLE IF NOT EXISTS `cliente_tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `numero` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Formato DD/MM/YYYY',
  `prioridad` enum('Alta','Media','Baja') COLLATE utf8mb4_unicode_ci DEFAULT 'Media',
  `tipo` enum('Soporte técnico','Facturación','Plataforma','Logística','Otro') COLLATE utf8mb4_unicode_ci DEFAULT 'Soporte técnico',
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `estado` enum('Abierta','En progreso','Resuelta','Cerrada') COLLATE utf8mb4_unicode_ci DEFAULT 'Abierta',
  `responsable` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tickets_cliente` (`cliente_id`),
  KEY `idx_numero` (`numero`),
  KEY `idx_estado` (`estado`),
  KEY `idx_prioridad` (`prioridad`),
  CONSTRAINT `fk_tickets_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_preferencias`
--

CREATE TABLE IF NOT EXISTS `cliente_preferencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL,
  `metodo_contacto` enum('Email','Teléfono','WhatsApp','Videollamada') COLLATE utf8mb4_unicode_ci DEFAULT 'Email',
  `franja_horaria` enum('Mañana (08:00 – 12:00)','Mediodía (12:00 – 16:00)','Tarde (16:00 – 20:00)','No llamar fuera de horario') COLLATE utf8mb4_unicode_ci DEFAULT 'Tarde (16:00 – 20:00)',
  `idioma` enum('Español','Inglés','Francés','Otro') COLLATE utf8mb4_unicode_ci DEFAULT 'Español',
  `frecuencia_contacto` enum('Semanal','Mensual','Trimestral','Solo cuando sea necesario') COLLATE utf8mb4_unicode_ci DEFAULT 'Mensual',
  `nivel_formalidad` enum('Alta formalidad','Neutral','Informal') COLLATE utf8mb4_unicode_ci DEFAULT 'Neutral',
  `notas` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cliente_preferencias` (`cliente_id`),
  CONSTRAINT `fk_preferencias_cliente` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
