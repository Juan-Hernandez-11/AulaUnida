import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '@/lib/requireAdmin';

const prisma = new PrismaClient();

// GET: Devuelve métricas y actividad reciente para el dashboard admin
export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;
  
  try {
    // Total de todos los usuarios
    const totalUsuarios = await prisma.user.count();
    
    // Estudiantes (rol STUDENT)
    const totalEstudiantes = await prisma.user.count({ where: { role: 'STUDENT' } });
    
    // Docentes (rol DOCENTE)
    const totalDocentes = await prisma.user.count({ where: { role: 'DOCENTE' } });
    
    // Admins (rol ADMIN)
    const totalAdmins = await prisma.user.count({ where: { role: 'ADMIN' } });
    
    // Grados registrados
    const totalGrados = await prisma.grado.count();
    
    // Materias registradas
    const totalMaterias = await prisma.materia.count();
    
    // Sedes registradas
    const totalSedes = await prisma.sede.count();
    
    // Actividad reciente (mock: últimos 5 usuarios creados)
    const usuariosRecientes = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      totalUsuarios,
      totalEstudiantes,
      totalDocentes,
      totalAdmins,
      totalGrados,
      totalMaterias,
      totalSedes,
      actividad: usuariosRecientes.map(u => ({
        user: u.name || u.email,
        action: 'Usuario creado',
        date: u.createdAt.toISOString().split('T')[0],
      })),
    });
  } catch (error) {
    console.error('Error en /api/admin/dashboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
