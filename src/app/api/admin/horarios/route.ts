import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/horarios?gradoId=...&cicloId=...
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gradoId = Number(searchParams.get('gradoId'));
  const cicloId = Number(searchParams.get('cicloId'));
  if (!gradoId || !cicloId) {
    return NextResponse.json({ error: 'gradoId y cicloId requeridos' }, { status: 400 });
  }
  // Prisma puede requerir regenerar el cliente si no reconoce cicloId
  const horarios = await prisma.horario.findMany({
    where: {
      gradoId: gradoId,
      cicloId: cicloId,
    },
    include: {
      materia: true,
      docente: { select: { id: true, name: true } },
      aula: true,
    },
    orderBy: [{ dia: 'asc' }, { horaInicio: 'asc' }],
  });
  return NextResponse.json(horarios);
}

// POST /api/admin/horarios
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { gradoId, cicloId, materiaId, docenteId, dia, horaInicio, horaFin, aulaId } = data;
  if (!gradoId || !cicloId || !materiaId || !docenteId || !dia || !horaInicio || !horaFin) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
  }
  // Prisma puede requerir regenerar el cliente si no reconoce cicloId
  const horario = await prisma.horario.create({
    data: {
      gradoId: gradoId,
      cicloId: cicloId,
      materiaId: materiaId,
      docenteId: docenteId,
      dia: dia,
      horaInicio: horaInicio,
      horaFin: horaFin,
      aulaId: aulaId || null,
    },
  });
  return NextResponse.json(horario);
}

// DELETE /api/admin/horarios?id=...
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 });
  await prisma.horario.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
