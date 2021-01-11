-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: testitapps
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `execution_results`
--

DROP TABLE IF EXISTS `execution_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_results` (
  `execution_results_id` bigint NOT NULL AUTO_INCREMENT,
  `runner_id` bigint NOT NULL DEFAULT '0',
  `execution_name` varchar(200) NOT NULL,
  `testcase_id` bigint NOT NULL,
  `execution_start_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_end_date` timestamp NULL DEFAULT NULL,
  `result` varchar(2000) DEFAULT '',
  `executed_by_id` bigint NOT NULL,
  `company_id` bigint NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `added_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `output` varchar(2000) DEFAULT '',
  `browser_id` bigint NOT NULL,
  `environment_id` bigint NOT NULL,
  `execution_user_id` bigint NOT NULL DEFAULT '1',
  `is_scheduled` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `email_sent` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`execution_results_id`),
  KEY `environment_id_fk_er` (`environment_id`),
  KEY `FK3vuok95equd88t1e659e63bjw` (`executed_by_id`),
  KEY `FKspcrth6122m6s0rs3qmrlleqr` (`testcase_id`),
  CONSTRAINT `environment_id_fk_er` FOREIGN KEY (`environment_id`) REFERENCES `environment` (`environment_id`),
  CONSTRAINT `FK3vuok95equd88t1e659e63bjw` FOREIGN KEY (`executed_by_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKspcrth6122m6s0rs3qmrlleqr` FOREIGN KEY (`testcase_id`) REFERENCES `testcases` (`testcase_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-11 11:06:51
