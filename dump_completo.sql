-- MySQL dump 10.13  Distrib 9.3.0, for Win64 (x86_64)
--
-- Host: localhost    Database: oppo_services
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `funnel`
--

DROP TABLE IF EXISTS `funnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estado` enum('Presentada','Denegada','Evolucionada','Ganada') NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `nif` varchar(255) DEFAULT NULL,
  `nombre_comercial` varchar(255) DEFAULT NULL,
  `nombre_fiscal` varchar(255) DEFAULT NULL,
  `grupo_empresa` varchar(255) DEFAULT NULL,
  `owner_id` int NOT NULL,
  `sector_id` int NOT NULL,
  `provincia_id` int NOT NULL,
  `servicio_id` int DEFAULT NULL,
  `prob_win` tinyint DEFAULT NULL,
  `potencial_oportunidad` varchar(255) DEFAULT NULL,
  `fecha_observacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `observaciones` text,
  `costes_salariales` decimal(12,2) DEFAULT NULL,
  `mb_costes_salariales` decimal(12,2) DEFAULT NULL,
  `costes_materiales` decimal(12,2) DEFAULT NULL,
  `mb_costes_materiales` decimal(12,2) DEFAULT NULL,
  `mb_proyecto` decimal(5,2) DEFAULT NULL,
  `fecha_fin_proyecto` date DEFAULT NULL,
  `fecha_inicio_proyecto` date DEFAULT NULL,
  `estado_cliente_services` enum('Activo','Inactivo','Prospecto') NOT NULL,
  `estado_cliente_grupo` enum('Activo','Inactivo','Prospecto') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_funnel_owner` (`owner_id`),
  KEY `idx_funnel_sector` (`sector_id`),
  KEY `idx_funnel_provincia` (`provincia_id`),
  KEY `idx_funnel_servicio` (`servicio_id`),
  CONSTRAINT `fk_funnel_owner` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_funnel_provincia` FOREIGN KEY (`provincia_id`) REFERENCES `provincias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_funnel_sector` FOREIGN KEY (`sector_id`) REFERENCES `sectores` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_funnel_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funnel`
--

LOCK TABLES `funnel` WRITE;
/*!40000 ALTER TABLE `funnel` DISABLE KEYS */;
INSERT INTO `funnel` VALUES (3,'Presentada','2025-11-27 15:12:26','12345','Eurofirms',NULL,NULL,2,1,8,NULL,NULL,NULL,'2025-11-27 15:12:26',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Prospecto','Prospecto'),(4,'Presentada','2025-11-27 15:53:14','45678','Eurofirms',NULL,NULL,2,1,13,NULL,NULL,NULL,'2025-11-27 15:53:14',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Prospecto','Prospecto'),(5,'Presentada','2025-12-04 12:51:28','445566','aaa','','',2,1,3,2,0,'0','2025-12-04 12:51:28','dfghdubfgvsdbf',0.00,0.00,0.00,0.00,0.00,NULL,NULL,'Prospecto','Prospecto');
/*!40000 ALTER TABLE `funnel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provincias`
--

DROP TABLE IF EXISTS `provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provincias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provincia` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provincias`
--

LOCK TABLES `provincias` WRITE;
/*!40000 ALTER TABLE `provincias` DISABLE KEYS */;
INSERT INTO `provincias` VALUES (1,'├üVILA'),(2,'BADAJOZ'),(3,'BARCELONA'),(4,'BURGOS'),(5,'C├üCERES'),(6,'C├üDIZ'),(7,'CASTELL├ôN'),(8,'CIUDAD REAL'),(9,'C├ôRDOBA'),(10,'CORU├æA'),(11,'CUENCA'),(12,'GERONA'),(13,'GRANADA'),(14,'GUADALAJARA'),(15,'HUELVA'),(16,'JA├ëN'),(17,'LA RIOJA'),(18,'LAS PALMAS'),(19,'LE├ôN'),(20,'L├ëRIDA'),(21,'LUGO'),(22,'MADRID'),(23,'M├üLAGA'),(24,'MURCIA'),(25,'NAVARRA'),(26,'ORENSE'),(27,'PALENCIA'),(28,'PONTEVEDRA'),(29,'SALAMANCA'),(30,'SANTA CRUZ DE TENERIFE'),(31,'SEGOVIA'),(32,'SEVILLA'),(33,'SORIA'),(34,'TARRAGONA'),(35,'TERUEL'),(36,'TOLEDO'),(37,'VALENCIA'),(38,'VALLADOLID'),(39,'VIZCAYA'),(40,'ZAMORA'),(41,'ZARAGOZA');
/*!40000 ALTER TABLE `provincias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector_servicio`
--

DROP TABLE IF EXISTS `sector_servicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector_servicio` (
  `sector_id` int NOT NULL,
  `servicio_id` int NOT NULL,
  PRIMARY KEY (`sector_id`,`servicio_id`),
  KEY `idx_sector_servicio_servicio` (`servicio_id`),
  CONSTRAINT `fk_sector_servicio_sector` FOREIGN KEY (`sector_id`) REFERENCES `sectores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sector_servicio_servicio` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector_servicio`
--

LOCK TABLES `sector_servicio` WRITE;
/*!40000 ALTER TABLE `sector_servicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `sector_servicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sectores`
--

DROP TABLE IF EXISTS `sectores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sectores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `vertical_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_sectores_nombre` (`nombre`),
  KEY `idx_sectores_vertical` (`vertical_id`),
  CONSTRAINT `fk_sectores_vertical` FOREIGN KEY (`vertical_id`) REFERENCES `verticales` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sectores`
--

LOCK TABLES `sectores` WRITE;
/*!40000 ALTER TABLE `sectores` DISABLE KEYS */;
INSERT INTO `sectores` VALUES (1,'Cleaning',3);
/*!40000 ALTER TABLE `sectores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_servicios_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servicios`
--

LOCK TABLES `servicios` WRITE;
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` VALUES (2,'Consultoria');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_funnel`
--

DROP TABLE IF EXISTS `user_funnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_funnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `funnel_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_funnel_user_funnel` (`user_id`,`funnel_id`),
  KEY `idx_user_funnel_funnel` (`funnel_id`),
  CONSTRAINT `fk_user_funnel_funnel` FOREIGN KEY (`funnel_id`) REFERENCES `funnel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_funnel_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_funnel`
--

LOCK TABLES `user_funnel` WRITE;
/*!40000 ALTER TABLE `user_funnel` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_funnel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_password` tinyint(1) NOT NULL DEFAULT '1',
  `rol` enum('Admin','Super_admin','Promotor') NOT NULL DEFAULT 'Promotor',
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `temp_password` varchar(255) DEFAULT NULL,
  `temp_password_expires` datetime DEFAULT NULL,
  `no_password` tinyint(1) DEFAULT '0',
  `failed_attempts` int DEFAULT '0',
  `locked_until` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_username` (`username`),
  KEY `idx_users_rol` (`rol`),
  KEY `idx_users_estado` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Super Administrador','superadmin','$2b$10$IWLEW8bkeUmHjXtGdGGXd.9j0P09ShWrhQYl2HkvdwIMeFCkV6ayu',0,'Super_admin','activo','2025-11-13 13:30:40',NULL,NULL,0,0,NULL),(2,'Julio','jdelafuente',NULL,1,'Promotor','activo','2025-11-20 12:12:56','$2b$10$FXJ8fbJGcc0Zx/JQLkODa.E3lxGPp7c3dNt5X6BCXzCbDPaXk8Z.i','2025-11-20 13:12:56',1,0,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verticales`
--

DROP TABLE IF EXISTS `verticales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verticales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_verticales_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verticales`
--

LOCK TABLES `verticales` WRITE;
/*!40000 ALTER TABLE `verticales` DISABLE KEYS */;
INSERT INTO `verticales` VALUES (3,'LOGISTICA','Linea de Logistica',1);
/*!40000 ALTER TABLE `verticales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'oppo_services'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-04 15:29:15
