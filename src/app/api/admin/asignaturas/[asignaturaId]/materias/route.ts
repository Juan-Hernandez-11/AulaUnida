import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * GET /api/admin/asignaturas/[asignaturaId]/materias
 * Obtiene las materias asociadas a una asignatura
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ asignaturaId: string }> }
) {
  try {
    const { asignaturaId: asignaturaIdStr } = await params;
    const asignaturaId = Number(asignaturaIdStr);

    const asignatura = await prisma.asignatura.findUnique({
      where: { id: asignaturaId },
      include: {
        materias: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
            area: true
          }
        }
      }
    });

    if (!asignatura) {
      return NextResponse.json({ error: 'Asignatura no encontrada' }, { status: 404 });
    }

    return NextResponse.json(asignatura);
  } catch (error) {
    console.error('Error en GET /api/admin/asignaturas/[id]/materias:', error);
    return NextResponse.json({ error: 'Error al obtener materias' }, { status: 500 });
  }
}

/**
 * PUT /api/admin/asignaturas/[asignaturaId]/materias
 * Asocia materias a una asignatura (reemplaza la asociación anterior)
 * Body: { materiaIds: number[] }
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ asignaturaId: string }> }
) {
  try {
    const { asignaturaId: asignaturaIdStr } = await params;
    const asignaturaId = Number(asignaturaIdStr);
    const { materiaIds } = await req.json();

    if (!Array.isArray(materiaIds)) {
      return NextResponse.json({ error: 'materiaIds debe ser un array' }, { status: 400 });
    }

    // Primero, desasociar todas las materias que tenían esta asignatura
    await prisma.materia.updateMany({
      where: { asignaturaId },
      data: { asignaturaId: null }
    });

    // Luego, asociar las nuevas materias
    await prisma.materia.updateMany({
      where: { id: { in: materiaIds } },
      data: { asignaturaId }
    });

    // Obtener y retornar la asignatura actualizada
    const asignatura = await prisma.asignatura.findUnique({
      where: { id: asignaturaId },
      include: {
        materias: {
          select: {
            id: true,
            nombre: true,
            codigo: true,
            area: true
          }
        }
      }
    });

    return NextResponse.json(asignatura);
  } catch (error) {
    console.error('Error en PUT /api/admin/asignaturas/[id]/materias:', error);
    return NextResponse.json({ error: 'Error al actualizar materias' }, { status: 500 });
  }
}

/**
 * POST /api/admin/asignaturas/[asignaturaId]/materias/add
 * Agrega una sola materia a una asignatura
 * Body: { materiaId: number }
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ asignaturaId: string }> }
) {
  try {
    const { asignaturaId: asignaturaIdStr } = await params;
    const asignaturaId = Number(asignaturaIdStr);
    const { materiaId } = await req.json();

    if (!materiaId) {
      return NextResponse.json({ error: 'materiaId es requerido' }, { status: 400 });
    }

    // Actualizar una sola materia
    const materia = await prisma.materia.update({
      where: { id: Number(materiaId) },
      data: { asignaturaId }
    });

    return NextResponse.json(materia);
  } catch (error) {
    console.error('Error en POST /api/admin/asignaturas/[id]/materias:', error);
    return NextResponse.json({ error: 'Error al agregar materia' }, { status: 500 });
  }
}
