import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';

// GET: Listar materias
export async function GET() {
  const materias = await prisma.materia.findMany({
    include: { grado: true },
    orderBy: { nombre: 'asc' },
  });
  return NextResponse.json(materias);
}

// POST: Crear materia
export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { nombre, area, codigo, gradoId } = data || {};
  if (
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof area !== 'string' || !area.trim() ||
    typeof codigo !== 'string' || !codigo.trim() ||
    typeof gradoId !== 'number' || isNaN(gradoId)
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
  }
  // Validar existencia de grado
  const grado = await prisma.grado.findUnique({ where: { id: gradoId } });
  if (!grado) {
    return NextResponse.json({ error: 'El grado especificado no existe' }, { status: 400 });
  }
  // Validar unicidad de código por grado
  const existe = await prisma.materia.findFirst({ where: { codigo: codigo.trim(), gradoId } });
  if (existe) {
    return NextResponse.json({ error: 'Ya existe una materia con ese código en el grado.' }, { status: 409 });
  }
  try {
    const materia = await prisma.materia.create({
      data: {
        nombre: nombre.trim(),
        area: area.trim(),
        codigo: codigo.trim(),
        gradoId,
      },
    });
    return NextResponse.json(materia);
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// PUT: Editar materia
export async function PUT(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { id, nombre, area, codigo, gradoId } = data || {};
  if (
    typeof id !== 'number' || isNaN(id) ||
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof area !== 'string' || !area.trim() ||
    typeof codigo !== 'string' || !codigo.trim() ||
    typeof gradoId !== 'number' || isNaN(gradoId)
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
  }
  // Validar existencia de grado
  const grado = await prisma.grado.findUnique({ where: { id: gradoId } });
  if (!grado) {
    return NextResponse.json({ error: 'El grado especificado no existe' }, { status: 400 });
  }
  // Validar unicidad de código por grado (excluyendo la propia materia)
  const existe = await prisma.materia.findFirst({ where: { codigo: codigo.trim(), gradoId, NOT: { id } } });
  if (existe) {
    return NextResponse.json({ error: 'Ya existe una materia con ese código en el grado.' }, { status: 409 });
  }
  try {
    const materia = await prisma.materia.update({
      where: { id },
      data: {
        nombre: nombre.trim(),
        area: area.trim(),
        codigo: codigo.trim(),
        gradoId,
      },
    });
    return NextResponse.json(materia);
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// DELETE: Eliminar materia
export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { id } = data || {};
  if (typeof id !== 'number' || isNaN(id)) {
    return NextResponse.json({ error: 'ID requerido o inválido' }, { status: 400 });
  }
  try {
    await prisma.materia.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
