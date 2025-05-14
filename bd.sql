-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para tesina
CREATE DATABASE IF NOT EXISTS `tesina` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tesina`;

-- Volcando estructura para tabla tesina.ahorros
CREATE TABLE IF NOT EXISTS `ahorros` (
  `idAhorro` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(100) NOT NULL,
  `totalRequerido` decimal(10,2) NOT NULL,
  `totalAbonado` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idAhorro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tesina.deudas
CREATE TABLE IF NOT EXISTS `deudas` (
  `idDeuda` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(255) NOT NULL,
  `saldoActual` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `limiteSaldo` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `interes` decimal(20,6) NOT NULL DEFAULT '0.000000',
  `fechaPago` date NOT NULL,
  PRIMARY KEY (`idDeuda`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tesina.gastos
CREATE TABLE IF NOT EXISTS `gastos` (
  `idGasto` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(50) DEFAULT NULL,
  `adeudo` int DEFAULT NULL,
  `prioridad` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idGasto`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tesina.ingresos
CREATE TABLE IF NOT EXISTS `ingresos` (
  `idIngreso` int NOT NULL AUTO_INCREMENT,
  `concepto` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `cantidad` int NOT NULL DEFAULT '0',
  `tipo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`idIngreso`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla tesina.tarjetas
CREATE TABLE IF NOT EXISTS `tarjetas` (
  `idTarjeta` int NOT NULL AUTO_INCREMENT,
  `entidadBancaria` varchar(100) NOT NULL,
  `numeroTarjeta` varchar(16) NOT NULL,
  `limiteCredito` decimal(10,2) NOT NULL,
  `saldoActual` decimal(10,2) NOT NULL,
  `tasaInteres` decimal(5,2) NOT NULL,
  `fechaCorte` date NOT NULL,
  `fechaPago` date NOT NULL,
  PRIMARY KEY (`idTarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
