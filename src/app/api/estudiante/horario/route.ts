import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/requireRole';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;
  const { user } = auth as any;

  try {
    // Buscar el grado del estudiante
    const gradoEst = await prisma.gradoEstudiante.findFirst({ where: { estudianteId: user.id }, include: { grado: true } });
    if (!gradoEst) return NextResponse.json([], { status: 200 });

    // Obtener horarios del grado y ciclo actual
    const horarios = await prisma.horario.findMany({ where: { gradoId: gradoEst.gradoId }, include: { materia: true, aula: true } });

    // Mapear a estructura simple
    const result = horarios.map(h => ({ dia: h.dia, hora: `${h.horaInicio} - ${h.horaFin}`, materia: h.materia.nombre, aula: h.aula?.nombre || '' }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener horario' }, { status: 500 });
  }
}
