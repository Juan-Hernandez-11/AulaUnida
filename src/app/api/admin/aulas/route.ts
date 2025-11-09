import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

// GET: Devuelve todas las aulas (id, codigo, nombre, sedeId, sede.nombre)
export async function GET() {
  try {
    const aulas = await prisma.aula.findMany({
      select: { id: true, codigo: true, nombre: true, sedeId: true, sede: { select: { nombre: true } } },
      orderBy: { nombre: 'asc' },
    });
    return NextResponse.json(aulas);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener aulas' }, { status: 500 });
  }
}

// POST: Crea un aula. Body: { codigo, nombre, sedeId }
export async function POST(request: Request) {
  try {
    const { codigo, nombre, sedeId } = await request.json();
    if (
      typeof codigo !== 'string' || !codigo.trim() ||
      typeof nombre !== 'string' || !nombre.trim() ||
      (!sedeId && sedeId !== 0)
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Verificar existencia de sede
    const sede = await prisma.sede.findUnique({ where: { id: Number(sedeId) } });
    if (!sede) {
      return NextResponse.json({ error: 'La sede especificada no existe' }, { status: 400 });
    }
    // Validar unicidad de código+sede
    const existe = await prisma.aula.findFirst({ where: { codigo: codigo.trim(), sedeId: Number(sedeId) } });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un aula con ese código en la sede seleccionada' }, { status: 409 });
    }
    const aula = await prisma.aula.create({
      data: { codigo: codigo.trim(), nombre: nombre.trim(), sedeId: Number(sedeId) },
      select: { id: true, codigo: true, nombre: true, sedeId: true, sede: { select: { nombre: true } } },
    });
    return NextResponse.json(aula);
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al crear aula' }, { status: 500 });
  }
}

// PUT: Edita un aula. Body: { id, codigo, nombre, sedeId }
export async function PUT(request: Request) {
  try {
    const { id, codigo, nombre, sedeId } = await request.json();
    if (
      (!id && id !== 0) || typeof codigo !== 'string' || !codigo.trim() ||
      typeof nombre !== 'string' || !nombre.trim() ||
      (!sedeId && sedeId !== 0)
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Verificar existencia de sede
    const sede = await prisma.sede.findUnique({ where: { id: Number(sedeId) } });
    if (!sede) {
      return NextResponse.json({ error: 'La sede especificada no existe' }, { status: 400 });
    }
    // Validar unicidad de código+sede (excluyendo el propio aula)
    const existe = await prisma.aula.findFirst({
      where: {
        codigo: codigo.trim(),
        sedeId: Number(sedeId),
        NOT: { id: Number(id) },
      },
    });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un aula con ese código en la sede seleccionada' }, { status: 409 });
    }
    const aula = await prisma.aula.update({
      where: { id: Number(id) },
      data: { codigo: codigo.trim(), nombre: nombre.trim(), sedeId: Number(sedeId) },
      select: { id: true, codigo: true, nombre: true, sedeId: true, sede: { select: { nombre: true } } },
    });
    return NextResponse.json(aula);
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al editar aula' }, { status: 500 });
  }
}

// DELETE: Elimina un aula. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id && id !== 0) {
      return NextResponse.json({ error: 'Falta el id' }, { status: 400 });
    }
    await prisma.aula.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'El aula no existe o ya fue eliminada' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al eliminar aula' }, { status: 500 });
  }
}
