import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todas las asignaturas (id, nombre, gradoId)
export async function GET() {
  try {
    const materias = await prisma.materia.findMany({
      select: { id: true, nombre: true, gradoId: true },
      orderBy: { nombre: 'asc' },
    });
    return NextResponse.json(materias);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener asignaturas' }, { status: 500 });
  }
}

// POST: Crea una asignatura. Body: { nombre, gradoId }
export async function POST(request: Request) {
  try {
    const { nombre, gradoId } = await request.json();
    if (!nombre || !gradoId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const materia = await prisma.materia.create({
      data: { nombre, gradoId: Number(gradoId) },
      select: { id: true, nombre: true, gradoId: true },
    });
    return NextResponse.json(materia);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear asignatura' }, { status: 500 });
  }
}

// PUT: Edita una asignatura. Body: { id, nombre, gradoId }
export async function PUT(request: Request) {
  try {
    const { id, nombre, gradoId } = await request.json();
    if (!id || !nombre || !gradoId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const materia = await prisma.materia.update({
      where: { id: Number(id) },
      data: { nombre, gradoId: Number(gradoId) },
      select: { id: true, nombre: true, gradoId: true },
    });
    return NextResponse.json(materia);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar asignatura' }, { status: 500 });
  }
}

// DELETE: Elimina una asignatura. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.materia.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar asignatura' }, { status: 500 });
  }
}
