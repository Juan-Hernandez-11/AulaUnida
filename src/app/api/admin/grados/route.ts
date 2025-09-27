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
    if (
      typeof nombre !== 'string' || !nombre.trim() ||
      typeof seccion !== 'string' || !seccion.trim() ||
      typeof sedeId !== 'number' || isNaN(sedeId) ||
      typeof cicloId !== 'number' || isNaN(cicloId)
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Validar existencia de sede
    const sede = await prisma.sede.findUnique({ where: { id: sedeId } });
    if (!sede) {
      return NextResponse.json({ error: 'La sede especificada no existe' }, { status: 400 });
    }
    // Validar existencia de ciclo
    const ciclo = await prisma.ciclo.findUnique({ where: { id: cicloId } });
    if (!ciclo) {
      return NextResponse.json({ error: 'El ciclo especificado no existe' }, { status: 400 });
    }
    // Validar existencia de aula si se envía
    let aula = null;
    if (aulaId !== undefined && aulaId !== null) {
      if (typeof aulaId !== 'number' || isNaN(aulaId)) {
        return NextResponse.json({ error: 'El aulaId debe ser un número válido' }, { status: 400 });
      }
      aula = await prisma.aula.findUnique({ where: { id: aulaId } });
      if (!aula) {
        return NextResponse.json({ error: 'El aula especificada no existe' }, { status: 400 });
      }
    }
    // Validar unicidad de nombre+seccion+sede+ciclo
    const existe = await prisma.grado.findFirst({
      where: {
        nombre: nombre.trim(),
        seccion: seccion.trim(),
        sedeId,
        cicloId,
      },
    });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un grado con ese nombre, sección, sede y ciclo.' }, { status: 409 });
    }
    const grado = await prisma.grado.create({
      data: { nombre: nombre.trim(), seccion: seccion.trim(), sedeId, cicloId, aulaId: aulaId ?? undefined },
      select: { id: true, nombre: true, seccion: true },
    });
    return NextResponse.json(grado);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al crear grado' }, { status: 500 });
  }
}

// PUT: Edita un grado. Body: { id, nombre, seccion, sedeId, cicloId, aulaId? }
export async function PUT(request: Request) {
  try {
    const { id, nombre, seccion, sedeId, cicloId, aulaId } = await request.json();
    if (
      typeof id !== 'number' || isNaN(id) ||
      typeof nombre !== 'string' || !nombre.trim() ||
      typeof seccion !== 'string' || !seccion.trim() ||
      typeof sedeId !== 'number' || isNaN(sedeId) ||
      typeof cicloId !== 'number' || isNaN(cicloId)
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    // Validar existencia de sede
    const sede = await prisma.sede.findUnique({ where: { id: sedeId } });
    if (!sede) {
      return NextResponse.json({ error: 'La sede especificada no existe' }, { status: 400 });
    }
    // Validar existencia de ciclo
    const ciclo = await prisma.ciclo.findUnique({ where: { id: cicloId } });
    if (!ciclo) {
      return NextResponse.json({ error: 'El ciclo especificado no existe' }, { status: 400 });
    }
    // Validar existencia de aula si se envía
    let aula = null;
    if (aulaId !== undefined && aulaId !== null) {
      if (typeof aulaId !== 'number' || isNaN(aulaId)) {
        return NextResponse.json({ error: 'El aulaId debe ser un número válido' }, { status: 400 });
      }
      aula = await prisma.aula.findUnique({ where: { id: aulaId } });
      if (!aula) {
        return NextResponse.json({ error: 'El aula especificada no existe' }, { status: 400 });
      }
    }
    // Validar unicidad de nombre+seccion+sede+ciclo (excluyendo el propio grado)
    const existe = await prisma.grado.findFirst({
      where: {
        nombre: nombre.trim(),
        seccion: seccion.trim(),
        sedeId,
        cicloId,
        NOT: { id },
      },
    });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un grado con ese nombre, sección, sede y ciclo.' }, { status: 409 });
    }
    const grado = await prisma.grado.update({
      where: { id },
      data: { nombre: nombre.trim(), seccion: seccion.trim(), sedeId, cicloId, aulaId: aulaId ?? undefined },
      select: { id: true, nombre: true, seccion: true },
    });
    return NextResponse.json(grado);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al editar grado' }, { status: 500 });
  }
}

// DELETE: Elimina un grado. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== 'number' || isNaN(id)) {
      return NextResponse.json({ error: 'Falta el id o el id no es válido' }, { status: 400 });
    }
    await prisma.grado.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al eliminar grado' }, { status: 500 });
  }
}
