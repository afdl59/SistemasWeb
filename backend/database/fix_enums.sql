-- Corrección de ENUMs en tablas de clientes
-- Fecha: 2024-12-06

USE `sistemasweb`;

-- Corregir ENUM de franja_horaria en cliente_preferencias
ALTER TABLE cliente_preferencias 
MODIFY COLUMN franja_horaria VARCHAR(100) DEFAULT 'Tarde (16:00 - 20:00)';

-- Corregir ENUM de tipo en cliente_tickets (quitar acento de 'técnico')
ALTER TABLE cliente_tickets 
MODIFY COLUMN tipo VARCHAR(100) DEFAULT 'Soporte tecnico';
