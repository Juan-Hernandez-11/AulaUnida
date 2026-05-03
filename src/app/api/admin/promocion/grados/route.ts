import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/admin/promocion/grados?anio=2026
 * Obtiene los grados disponibles para un año (para el filtro de promoción).
 * Query params:
 *   - anio: string (obligatorio, ej: "2026")
 * Responde: { grados: [{ nombre: string, secciones: string[] }] }
 */
export async function GET(req: NextRequest) {
  try {
    const anio = req.nextUrl.searchParams.get('anio');
    if (!anio) {
      return NextResponse.json({ error: 'anio es requerido (ej: 2026)' }, { status: 400 });
    }

    // Obtener todos los ciclos del año
    const ciclosDelAnio = await prisma.ciclo.findMany({
      where: {
        nombre: { contains: anio }
      }
    });

    if (ciclosDelAnio.length === 0) {
      return NextResponse.json({ error: `No hay ciclos para el año ${anio}` }, { status: 404 });
    }

    const cicloIds = ciclosDelAnio.map(c => c.id);

    // Obtener todos los grados de estos ciclos
    const grados = await prisma.grado.findMany({
      where: { cicloId: { in: cicloIds } },
      select: {
        nombre: true,
        seccion: true
      },
      distinct: ['nombre', 'seccion']
    });

    // Agrupar grados por nombre y recopilar secciones únicas
    const gradosAgrupados = new Map<string, Set<string>>();

    for (const grado of grados) {
      if (!gradosAgrupados.has(grado.nombre)) {
        gradosAgrupados.set(grado.nombre, new Set());
      }
      // Solo agregar secciones no vacías
      if (grado.seccion && grado.seccion.trim() !== '') {
        gradosAgrupados.get(grado.nombre)!.add(grado.seccion);
      }
    }

    // Convertir a formato array
    const resultado = Array.from(gradosAgrupados.entries()).map(([nombre, secciones]) => ({
      nombre,
      secciones: Array.from(secciones).sort()
    }));

    return NextResponse.json({ grados: resultado });
  } catch (error) {
    console.error('Error en GET /api/admin/promocion/grados:', error);
    return NextResponse.json({ error: 'Error al obtener grados' }, { status: 500 });
  }
}
