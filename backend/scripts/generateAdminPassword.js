/**
 * Script para generar el hash de la contraseña del Super Admin
 * Ejecutar: node backend/scripts/generateAdminPassword.js
 */

const bcrypt = require('bcrypt');

const password = 'Admin123!'; // Cambia esto por la contraseña deseada
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar hash:', err);
    return;
  }
  
  console.log('\n========================================');
  console.log('HASH DE CONTRASEÑA GENERADO');
  console.log('========================================\n');
  console.log('Contraseña:', password);
  console.log('Hash:', hash);
  console.log('\n========================================');
  console.log('INSTRUCCIONES:');
  console.log('========================================\n');
  console.log('1. Copia el hash generado arriba');
  console.log('2. Abre el archivo: backend/database/schema.sql');
  console.log('3. Busca la línea que dice:');
  console.log("   '$2b$10$8Z6YJ5YQZxJ5yQJ5YQJ5YeJ5YQJ5YQJ5YQJ5YQJ5YQJ5YQJ5YQJ5Y',");
  console.log('4. Reemplázala con el hash generado');
  console.log('5. Ejecuta el script SQL en MySQL\n');
});
