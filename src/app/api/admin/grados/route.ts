import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todos los grados (id, nombre, seccion)
export async function GET() {
  try {
    const grados = await prisma.grado.findMany({
      select: { id: true, nombre: true, seccion: true },
      orderBy: { nombre: 'asc' },
    });
    return NextResponse.json(grados);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener grados' }, { status: 500 });
  }
}

// POST: Crea un grado. Body: { nombre, seccion, sedeId, cicloId, aulaId? }
export async function POST(request: Request) {
  try {
    const { nombre, seccion, sedeId, cicloId, aulaId } = await request.json();
    if (!nombre || !seccion || !sedeId || !cicloId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const grado = await prisma.grado.create({
      data: { nombre, seccion, sedeId: Number(sedeId), cicloId: Number(cicloId), aulaId: aulaId ? Number(aulaId) : undefined },
      select: { id: true, nombre: true, seccion: true },
    });
    return NextResponse.json(grado);
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear grado' }, { status: 500 });
  }
}

// PUT: Edita un grado. Body: { id, nombre, seccion, sedeId, cicloId, aulaId? }
export async function PUT(request: Request) {
  try {
    const { id, nombre, seccion, sedeId, cicloId, aulaId } = await request.json();
    if (!id || !nombre || !seccion || !sedeId || !cicloId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const grado = await prisma.grado.update({
      where: { id: Number(id) },
      data: { nombre, seccion, sedeId: Number(sedeId), cicloId: Number(cicloId), aulaId: aulaId ? Number(aulaId) : undefined },
      select: { id: true, nombre: true, seccion: true },
    });
    return NextResponse.json(grado);
  } catch (error) {
    return NextResponse.json({ error: 'Error al editar grado' }, { status: 500 });
  }
}

// DELETE: Elimina un grado. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.grado.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar grado' }, { status: 500 });
  }
}
