import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Devuelve todos los ciclos (id, nombre, fechaInicio, fechaFin, cerrado)
export async function GET() {
  try {
    const ciclos = await prisma.ciclo.findMany({
      select: { id: true, nombre: true, fechaInicio: true, fechaFin: true, cerrado: true },
      orderBy: { fechaInicio: 'desc' },
    });
    return NextResponse.json(ciclos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener ciclos' }, { status: 500 });
  }
}

// POST: Crea un ciclo. Body: { nombre, fechaInicio, fechaFin }
export async function POST(request: Request) {
  try {
    const { nombre, fechaInicio, fechaFin } = await request.json();
    if (
      typeof nombre !== 'string' || !nombre.trim() ||
      !fechaInicio || !fechaFin
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
    }
    if (inicio >= fin) {
      return NextResponse.json({ error: 'La fecha de inicio debe ser anterior a la de fin.' }, { status: 400 });
    }
    // Validar unicidad de nombre
    const existe = await prisma.ciclo.findFirst({ where: { nombre: nombre.trim() } });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un ciclo con ese nombre.' }, { status: 409 });
    }
    const ciclo = await prisma.ciclo.create({
      data: { nombre: nombre.trim(), fechaInicio: inicio, fechaFin: fin },
      select: { id: true, nombre: true, fechaInicio: true, fechaFin: true, cerrado: true },
    });
    return NextResponse.json(ciclo);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al crear ciclo' }, { status: 500 });
  }
}

// PUT: Edita un ciclo. Body: { id, nombre, fechaInicio, fechaFin, cerrado }
export async function PUT(request: Request) {
  try {
    const { id, nombre, fechaInicio, fechaFin, cerrado } = await request.json();
    if (
      typeof id !== 'number' || isNaN(id) ||
      typeof nombre !== 'string' || !nombre.trim() ||
      !fechaInicio || !fechaFin
    ) {
      return NextResponse.json({ error: 'Faltan campos obligatorios o tipos incorrectos' }, { status: 400 });
    }
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (isNaN(inicio.getTime()) || isNaN(fin.getTime())) {
      return NextResponse.json({ error: 'Fechas inválidas' }, { status: 400 });
    }
    if (inicio >= fin) {
      return NextResponse.json({ error: 'La fecha de inicio debe ser anterior a la de fin.' }, { status: 400 });
    }
    // Validar unicidad de nombre (excluyendo el propio ciclo)
    const existe = await prisma.ciclo.findFirst({ where: { nombre: nombre.trim(), NOT: { id } } });
    if (existe) {
      return NextResponse.json({ error: 'Ya existe un ciclo con ese nombre.' }, { status: 409 });
    }
    const ciclo = await prisma.ciclo.update({
      where: { id },
      data: { nombre: nombre.trim(), fechaInicio: inicio, fechaFin: fin, cerrado: !!cerrado },
      select: { id: true, nombre: true, fechaInicio: true, fechaFin: true, cerrado: true },
    });
    return NextResponse.json(ciclo);
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al editar ciclo' }, { status: 500 });
  }
}

// DELETE: Elimina un ciclo. Body: { id }
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (typeof id !== 'number' || isNaN(id)) {
      return NextResponse.json({ error: 'Falta el id o el id no es válido' }, { status: 400 });
    }
    await prisma.ciclo.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code && error.code.startsWith('P')) {
      return NextResponse.json({ error: 'Error de base de datos: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Error al eliminar ciclo' }, { status: 500 });
  }
}
