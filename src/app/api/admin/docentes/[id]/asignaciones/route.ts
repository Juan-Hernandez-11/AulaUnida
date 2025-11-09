import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Lista todas las asignaciones de un docente
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const docenteId = Number(resolvedParams.id);
  if (isNaN(docenteId)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  try {
    const asignaciones = await prisma.materiaGradoDocente.findMany({
      where: { docenteId },
      include: {
        materiaGrado: {
          include: {
            materia: true,
            grado: true,
          },
        },
        periodo: true,
      },
    });
    return NextResponse.json(asignaciones);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener asignaciones' }, { status: 500 });
  }
}

// POST: Crear una nueva asignación (materia, grado, periodo)
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const docenteId = Number(resolvedParams.id);
  if (isNaN(docenteId)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  try {
    const { materiaId, gradoId, periodoId } = await request.json();
    if (!materiaId || !gradoId || !periodoId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    // Buscar o crear MateriaGrado
    let materiaGrado = await prisma.materiaGrado.findFirst({ where: { materiaId, gradoId } });
    if (!materiaGrado) {
      materiaGrado = await prisma.materiaGrado.create({ data: { materiaId, gradoId } });
    }
    // Crear la asignación
    const asignacion = await prisma.materiaGradoDocente.create({
      data: {
        materiaGradoId: materiaGrado.id,
        docenteId,
        periodoId,
      },
      include: {
        materiaGrado: { include: { materia: true, grado: true } },
        periodo: true,
      },
    });
    return NextResponse.json(asignacion);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear asignación' }, { status: 500 });
  }
}

// DELETE: Eliminar una asignación
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const docenteId = Number(resolvedParams.id);
  if (isNaN(docenteId)) return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  try {
    const { materiaGradoDocenteId } = await request.json();
    if (!materiaGradoDocenteId) return NextResponse.json({ error: 'Falta el id de la asignación' }, { status: 400 });
    await prisma.materiaGradoDocente.delete({ where: { id: materiaGradoDocenteId, docenteId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar asignación' }, { status: 500 });
  }
}
