// Script para actualizar el Firebase UID del usuario admin
require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

async function updateUserFirebaseUid() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔄 Actualizando Firebase UID del usuario admin...\n');
    
    // El nuevo UID que vimos en los logs
    const newFirebaseUid = '6hnOeCC2EwOCAJxImyDqczA9By13';
    const email = 'c.paternina2014@gmail.com';
    
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { firebaseUid: newFirebaseUid },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        firebaseUid: true,
        active: true
      }
    });

    console.log('✅ Usuario actualizado exitosamente:');
    console.log(`📋 Usuario ID: ${updatedUser.id}`);
    console.log(`   Nombre: ${updatedUser.name}`);
    console.log(`   Email: ${updatedUser.email}`);
    console.log(`   Rol: ${updatedUser.role}`);
    console.log(`   Firebase UID: ${updatedUser.firebaseUid}`);
    console.log(`   Activo: ${updatedUser.active ? 'Sí' : 'No'}`);
    console.log('\n🎉 Ahora puedes hacer login con c.paternina2014@gmail.com y contraseña paternina1');
    
  } catch (error) {
    console.error('❌ Error actualizando usuario:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateUserFirebaseUid();