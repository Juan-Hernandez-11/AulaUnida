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
    if (
      typeof gradoId !== 'number' || isNaN(gradoId) ||
      typeof estudianteId !== 'number' || isNaN(estudianteId)
    ) {
      return NextResponse.json({ error: 'gradoId y estudianteId deben ser números válidos.' }, { status: 400 });
    }
    // Validar existencia de grado
    const grado = await prisma.grado.findUnique({ where: { id: gradoId } });
    if (!grado) {
      return NextResponse.json({ error: 'El grado especificado no existe.' }, { status: 404 });
    }
    // Validar que el usuario sea estudiante
    const user = await prisma.user.findUnique({ where: { id: estudianteId } });
    if (!user) {
      return NextResponse.json({ error: 'El usuario no existe.' }, { status: 404 });
    }
    if (user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Solo se pueden matricular usuarios con rol estudiante.' }, { status: 400 });
    }
    // Verifica si ya está matriculado
    const existe = await prisma.gradoEstudiante.findFirst({
      where: { gradoId, estudianteId },
    });
    if (existe) {
      return NextResponse.json({ error: 'El estudiante ya está matriculado en este grado.' }, { status: 409 });
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
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error inesperado al matricular estudiante.' }, { status: 500 });
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
    if (
      typeof gradoId !== 'number' || isNaN(gradoId) ||
      typeof estudianteId !== 'number' || isNaN(estudianteId)
    ) {
      return NextResponse.json({ error: 'gradoId y estudianteId deben ser números válidos.' }, { status: 400 });
    }
    // Validar existencia de grado
    const grado = await prisma.grado.findUnique({ where: { id: gradoId } });
    if (!grado) {
      return NextResponse.json({ error: 'El grado especificado no existe.' }, { status: 404 });
    }
    // Validar existencia de usuario
    const user = await prisma.user.findUnique({ where: { id: estudianteId } });
    if (!user) {
      return NextResponse.json({ error: 'El usuario no existe.' }, { status: 404 });
    }
    await prisma.gradoEstudiante.deleteMany({
      where: { gradoId, estudianteId },
    });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al eliminar matrícula' }, { status: 500 });
  }
}
