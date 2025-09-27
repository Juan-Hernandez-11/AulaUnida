import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todas las sedes (id, nombre, direccion)
export async function GET() {
  try {
    const sedes = await prisma.sede.findMany({
      select: { id: true, nombre: true, direccion: true },
      orderBy: { nombre: 'asc' },
    });
    return NextResponse.json(sedes);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener sedes' }, { status: 500 });
  }
}

// POST: Crea una sede. Body: { nombre, direccion }
export async function POST(request: Request) {
  try {
    const { nombre, direccion } = await request.json();
    if (
      typeof nombre !== 'string' || !nombre.trim() ||
      typeof direccion !== 'string' || !direccion.trim()
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Validar unicidad de nombre
    const existe = await prisma.sede.findFirst({ where: { nombre: nombre.trim() } });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe una sede con ese nombre.' }, { status: 409 });
    }
    const sede = await prisma.sede.create({
      data: { nombre: nombre.trim(), direccion: direccion.trim() },
      select: { id: true, nombre: true, direccion: true },
    });
    return NextResponse.json(sede);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al crear sede' }, { status: 500 });
  }
}

// PUT: Edita una sede. Body: { id, nombre, direccion }
export async function PUT(request: Request) {
  try {
    const { id, nombre, direccion } = await request.json();
    if (
      typeof id !== 'number' || isNaN(id) ||
      typeof nombre !== 'string' || !nombre.trim() ||
      typeof direccion !== 'string' || !direccion.trim()
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Validar unicidad de nombre (excluyendo la propia sede)
    const existe = await prisma.sede.findFirst({ where: { nombre: nombre.trim(), NOT: { id } } });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe una sede con ese nombre.' }, { status: 409 });
    }
    const sede = await prisma.sede.update({
      where: { id },
      data: { nombre: nombre.trim(), direccion: direccion.trim() },
      select: { id: true, nombre: true, direccion: true },
    });
    return NextResponse.json(sede);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al editar sede' }, { status: 500 });
  }
}

// DELETE: Elimina una sede. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== 'number' || isNaN(id)) {
      return NextResponse.json({ error: 'Falta el id o el id no es válido' }, { status: 400 });
    }
    await prisma.sede.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al eliminar sede' }, { status: 500 });
  }
}
