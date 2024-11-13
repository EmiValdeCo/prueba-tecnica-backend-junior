DROP DATABASE IF EXISTS db_prueba_tecnica;

CREATE DATABASE db_prueba_tecnica;

USE db_prueba_tecnica;

CREATE TABLE tb_usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    telefono_usuario VARCHAR(100) NOT NULL UNIQUE,
    direccion_usuario VARCHAR(255) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    clave_usuario VARCHAR(300) NOT NULL,
    estado_usuario ENUM('Activo', 'Inactivo') DEFAULT 'Activo' NOT NULL,
    fecha_registro DATE DEFAULT (CURRENT_DATE)
);