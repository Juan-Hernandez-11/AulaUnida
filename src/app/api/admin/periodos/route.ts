import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Lista todos los periodos, o los de un ciclo si se pasa cicloId
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cicloId = url.searchParams.get('cicloId');
    let periodos;
    if (cicloId) {
      periodos = await prisma.periodo.findMany({
        where: { cicloId: Number(cicloId) },
        select: { id: true, nombre: true, fechaInicio: true, fechaFin: true, cicloId: true },
        orderBy: { fechaInicio: 'asc' },
      });
    } else {
      periodos = await prisma.periodo.findMany({
        select: { id: true, nombre: true, fechaInicio: true, fechaFin: true, cicloId: true },
        orderBy: { fechaInicio: 'asc' },
      });
    }
    return NextResponse.json(periodos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener periodos' }, { status: 500 });
  }
}

// POST: Crea un nuevo periodo
export async function POST(request: Request) {
  try {
    const { nombre, fechaInicio, fechaFin, cicloId } = await request.json();
    const nuevoPeriodo = await prisma.periodo.create({
      data: {
        nombre,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin),
        cicloId,
      },
    });
    return NextResponse.json(nuevoPeriodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear periodo' }, { status: 500 });
  }
}
