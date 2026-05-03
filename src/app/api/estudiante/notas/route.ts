import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/requireRole';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ('error' in auth) {
    return auth.error;
  }
  const { user } = auth as any;

  try {
    const url = new URL(request.url);
    const estudianteIdParam = url.searchParams.get('estudianteId');
    const materiaIdParam = url.searchParams.get('materiaId');
    const periodoIdParam = url.searchParams.get('periodoId');

    // Si no vienen params, devolver todas las notas del estudiante autenticado con detalles
    if (!estudianteIdParam && !materiaIdParam && !periodoIdParam) {
      try {
        // Query usando SOLO columnas que existen: id, estudianteId, materiaId, periodoId, valor
        const notas = await prisma.$queryRaw`
          SELECT 
            n.id,
            n.valor,
            n."estudianteId",
            n."materiaId",
            n."periodoId",
            m.nombre as "materiaNombre",
            p.nombre as "periodoNombre"
          FROM "NotaMateriaPeriodo" n
          LEFT JOIN "Materia" m ON n."materiaId" = m.id
          LEFT JOIN "Periodo" p ON n."periodoId" = p.id
          WHERE n."estudianteId" = ${user.id}
          ORDER BY n.id DESC
        `;
        
        return NextResponse.json(
          (notas as any[]).map(n => ({
            id: n.id,
            valor: n.valor,
            materia: { id: n.materiaId, nombre: n.materiaNombre },
            periodo: { id: n.periodoId, nombre: n.periodoNombre }
          }))
        );
      } catch (dbError) {
        console.error('Error en query raw:', dbError);
        // Si falla, retornar array vacío
        return NextResponse.json([]);
      }
    }

    // Si vienen params (estudianteId,materiaId,periodoId) -> cálculo de promedio
    if (estudianteIdParam && materiaIdParam && periodoIdParam) {
      const estudianteId = Number(estudianteIdParam);
      const materiaId = Number(materiaIdParam);
      const periodoId = Number(periodoIdParam);
      if (!estudianteId || !materiaId || !periodoId) return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });

      if (user.role === 'STUDENT' && user.id !== estudianteId) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
      }

      const notas = await prisma.notaMateriaPeriodo.findMany({
        where: {
          estudianteId,
          materiaId,
          periodoId
        },
        select: { valor: true }
      });
      
      if (notas.length === 0) {
        return NextResponse.json({ promedio: null, cantidad: 0 });
      }
      
      const suma = notas.reduce((acc: number, n) => acc + n.valor, 0);
      const promedio = suma / notas.length;
      return NextResponse.json({ promedio, cantidad: notas.length });
    }

    return NextResponse.json({ error: 'Parámetros insuficientes' }, { status: 400 });
  } catch (error) {
    console.error('Error general en /api/estudiante/notas:', error);
    return NextResponse.json([]);
  }
}
