import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/**
 * GET /api/admin/matricula?gradoId=ID
 * Lista los estudiantes matriculados en un grado específico.
 * Query params:
 *   - gradoId: number (obligatorio)
 * Responde: [{ id, name, email }]
 */
export async function GET(req: NextRequest) {
  try {
    const gradoId = Number(req.nextUrl.searchParams.get('gradoId'));
    if (!gradoId) return NextResponse.json([], { status: 200 });
    const matriculas = await prisma.gradoEstudiante.findMany({
      where: { gradoId },
      include: { estudiante: true },
    });
    return NextResponse.json(matriculas.map((m: any) => ({
      id: m.estudiante.id,
      name: m.estudiante.name,
      email: m.estudiante.email,
    })));
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener matrículas' }, { status: 500 });
  }
}


/**
 * POST /api/admin/matricula
 * Matricula un estudiante en un grado.
 * Body: { gradoId: number, estudianteId: number }
 * Responde: { id, name, email } del estudiante matriculado
 */
export async function POST(req: NextRequest) {
  try {
    const { gradoId, estudianteId } = await req.json();
    if (!gradoId || !estudianteId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }
    // Verifica si ya está matriculado
    const existe = await prisma.gradoEstudiante.findFirst({
      where: { gradoId, estudianteId },
    });
    if (existe) {
      return NextResponse.json({ error: 'Ya está matriculado' }, { status: 400 });
    }
    const matricula = await prisma.gradoEstudiante.create({
      data: { gradoId, estudianteId },
      include: { estudiante: true },
    });
    return NextResponse.json({
      id: matricula.estudiante.id,
      name: matricula.estudiante.name,
      email: matricula.estudiante.email,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al matricular estudiante' }, { status: 500 });
  }
}


/**
 * DELETE /api/admin/matricula
 * Elimina la matrícula de un estudiante en un grado.
 * Body: { gradoId: number, estudianteId: number }
 * Responde: { ok: true }
 */
export async function DELETE(req: NextRequest) {
  try {
    const { gradoId, estudianteId } = await req.json();
    if (!gradoId || !estudianteId) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }
    await prisma.gradoEstudiante.deleteMany({
      where: { gradoId, estudianteId },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar matrícula' }, { status: 500 });
  }
}
