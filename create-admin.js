// Script para crear usuario administrador
const { PrismaClient } = require('@prisma/client');

async function createAdminUser() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔧 Creando usuario administrador...\n');
    
    // Datos del usuario admin (ajusta según lo que creaste en Firebase)
    const adminData = {
      name: 'Cristian Paternina',
      email: 'c.paternina2014@gmail.com',
      role: 'ADMIN',
      firebaseUid: '0nOw9KzxIzeVXsbJ1Nr5DNAxOsi1', // Del log del servidor
      passwordHash: '', // No se usa porque usamos Firebase Auth
      active: true
    };

    const user = await prisma.user.create({
      data: adminData
    });

    console.log('✅ Usuario administrador creado exitosamente:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Nombre: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rol: ${user.role}`);
    console.log(`   Firebase UID: ${user.firebaseUid}`);
    console.log('\n🎉 ¡Ahora puedes iniciar sesión!');
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ El usuario ya existe en la base de datos');
    } else {
      console.error('❌ Error creando usuario:', error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();