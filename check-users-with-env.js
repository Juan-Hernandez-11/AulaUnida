// Script para verificar usuarios en la base de datos con variables de entorno
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

async function checkUsers() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Verificando usuarios en la base de datos...\n');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        firebaseUid: true,
        active: true
      }
    });

    if (users.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
      console.log('💡 Necesitas crear un usuario admin primero');
    } else {
      console.log(`✅ Encontrados ${users.length} usuario(s):\n`);
      users.forEach(user => {
        console.log(`📋 Usuario ID: ${user.id}`);
        console.log(`   Nombre: ${user.name || 'Sin nombre'}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Rol: ${user.role}`);
        console.log(`   Firebase UID: ${user.firebaseUid || 'Sin UID'}`);
        console.log(`   Activo: ${user.active ? 'Sí' : 'No'}`);
        console.log('');
      });
    }
  } catch (error) {
    console.error('❌ Error conectando a la base de datos:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();