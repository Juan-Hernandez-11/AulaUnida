import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/requireRole';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ('error' in auth) return auth.error;
  const { user } = auth as any;

  try {
    const url = new URL(request.url);
    const estudianteIdParam = url.searchParams.get('estudianteId');
    const materiaIdParam = url.searchParams.get('materiaId');
    const periodoIdParam = url.searchParams.get('periodoId');

    // Si no vienen params, devolver todas las notas del estudiante autenticado
    if (!estudianteIdParam && !materiaIdParam && !periodoIdParam) {
      const notas = await prisma.notaMateriaPeriodo.findMany({ where: { estudianteId: user.id }, include: { materia: true, periodo: true } });
      return NextResponse.json(notas);
    }

    // Si vienen params (estudianteId,materiaId,periodoId) -> cálculo de promedio (verifica permisos)
    if (estudianteIdParam && materiaIdParam && periodoIdParam) {
      const estudianteId = Number(estudianteIdParam);
      const materiaId = Number(materiaIdParam);
      const periodoId = Number(periodoIdParam);
      if (!estudianteId || !materiaId || !periodoId) return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });

      if (user.role === 'STUDENT' && user.id !== estudianteId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
      }

      const notas = await prisma.notaMateriaPeriodo.findMany({ where: { estudianteId, materiaId, periodoId }, select: { valor: true } });
      if (!notas.length) return NextResponse.json({ promedio: null, cantidad: 0 });
      const suma = notas.reduce((acc: number, n: any) => acc + n.valor, 0);
      const promedio = suma / notas.length;
      return NextResponse.json({ promedio, cantidad: notas.length });
    }

    return NextResponse.json({ error: 'Parámetros insuficientes' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener notas' }, { status: 500 });
  }
}
