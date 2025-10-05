import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/requireAdmin';

// GET: Listar materias (con grados asociados)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const gradoId = url.searchParams.get('gradoId');
  let materias;
  if (gradoId) {
    materias = await prisma.materia.findMany({
      where: {
        materiaGrados: {
          some: { gradoId: Number(gradoId) }
        }
      },
      include: {
        materiaGrados: { include: { grado: true } }
      },
      orderBy: { nombre: 'asc' },
    });
  } else {
    materias = await prisma.materia.findMany({
      include: {
        materiaGrados: { include: { grado: true } }
      },
      orderBy: { nombre: 'asc' },
    });
  }
  return NextResponse.json(materias);
}

// POST: Crear materia y vincular grados
export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { nombre, area, codigo, gradoIds } = data || {};
  if (
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof area !== 'string' || !area.trim() ||
    typeof codigo !== 'string' || !codigo.trim() ||
    !Array.isArray(gradoIds) || gradoIds.length === 0 || gradoIds.some(id => typeof id !== 'number' || isNaN(id))
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
  }
  // Validar existencia de grados
  const grados = await prisma.grado.findMany({ where: { id: { in: gradoIds } } });
  if (grados.length !== gradoIds.length) {
    return NextResponse.json({ error: 'Uno o más grados no existen' }, { status: 400 });
  }
  // Validar unicidad de código
  const existe = await prisma.materia.findFirst({ where: { codigo: codigo.trim() } });
  if (existe) {
    return NextResponse.json({ error: 'Ya existe una materia con ese código.' }, { status: 409 });
  }
  try {
    const materia = await prisma.materia.create({
      data: {
        nombre: nombre.trim(),
        area: area.trim(),
        codigo: codigo.trim(),
        materiaGrados: {
          create: gradoIds.map(gradoId => ({ grado: { connect: { id: gradoId } } }))
        }
      },
      include: { materiaGrados: { include: { grado: true } } }
    });
    return NextResponse.json(materia);
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// PUT: Editar materia y sus grados
export async function PUT(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { id, nombre, area, codigo, gradoIds } = data || {};
  if (
    typeof id !== 'number' || isNaN(id) ||
    typeof nombre !== 'string' || !nombre.trim() ||
    typeof area !== 'string' || !area.trim() ||
    typeof codigo !== 'string' || !codigo.trim() ||
    !Array.isArray(gradoIds) || gradoIds.length === 0 || gradoIds.some(id => typeof id !== 'number' || isNaN(id))
  ) {
    return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
  }
  // Validar existencia de grados
  const grados = await prisma.grado.findMany({ where: { id: { in: gradoIds } } });
  if (grados.length !== gradoIds.length) {
    return NextResponse.json({ error: 'Uno o más grados no existen' }, { status: 400 });
  }
  // Validar unicidad de código (excluyendo la propia materia)
  const existe = await prisma.materia.findFirst({ where: { codigo: codigo.trim(), NOT: { id } } });
  if (existe) {
    return NextResponse.json({ error: 'Ya existe una materia con ese código.' }, { status: 409 });
  }
  try {
    // Actualiza materia
    const materia = await prisma.materia.update({
      where: { id },
      data: {
        nombre: nombre.trim(),
        area: area.trim(),
        codigo: codigo.trim(),
      },
    });
    // Sincroniza grados
    await prisma.materiaGrado.deleteMany({ where: { materiaId: id } });
    await prisma.materiaGrado.createMany({
      data: gradoIds.map(gradoId => ({ materiaId: id, gradoId })),
      skipDuplicates: true
    });
    const materiaActualizada = await prisma.materia.findUnique({
      where: { id },
      include: { materiaGrados: { include: { grado: true } } }
    });
    return NextResponse.json(materiaActualizada);
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

// DELETE: Eliminar materia y sus relaciones
export async function DELETE(request: Request) {
  const admin = await requireAdmin(request);
  if ('error' in admin) return admin;
  const data = await request.json();
  const { id } = data || {};
  if (typeof id !== 'number' || isNaN(id)) {
    return NextResponse.json({ error: 'ID requerido o inválido' }, { status: 400 });
  }
  try {
    await prisma.materiaGrado.deleteMany({ where: { materiaId: id } });
    await prisma.materia.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.code && e.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + e.message }, { status: 500 });
    }
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
