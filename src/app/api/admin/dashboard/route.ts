import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve métricas y actividad reciente para el dashboard admin
export async function GET() {
  try {
    // Usuarios activos
    const usuariosActivos = await prisma.user.count({ where: { active: true } });
    // Grados registrados
    const gradosRegistrados = await prisma.grado.count();
    // Anuncios recientes (últimos 30 días)
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() - 30);
  const anunciosRecientes = await prisma.anuncio.count({ where: { fecha: { gte: fechaLimite } } });

    // Actividad reciente (mock: últimos 5 cambios de usuario)
    const actividad = await prisma.cambio.findMany({
      orderBy: { fecha: 'desc' },
      take: 5,
      select: {
        usuario: { select: { name: true } },
        cambio: true,
        fecha: true,
      },
    });

    return NextResponse.json({
      usuariosActivos,
      gradosRegistrados,
      anunciosRecientes,
      actividad: actividad.map(a => ({
        user: a.usuario?.name || '-',
        action: a.cambio,
        date: a.fecha.toISOString().split('T')[0],
      })),
    });
  } catch (error) {
    console.error('Error en /api/admin/dashboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
