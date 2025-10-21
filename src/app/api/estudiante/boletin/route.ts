import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Devuelve datos personales del estudiante y sus notas por periodo para generar el boletín
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);
    const user = await prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
    if (!user) return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });

    const url = new URL(request.url);
    const cicloIdParam = url.searchParams.get('cicloId');
    if (!cicloIdParam) return NextResponse.json({ error: 'Falta cicloId' }, { status: 400 });
    const cicloId = Number(cicloIdParam);

    // Datos personales y grado
    const estudiante = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        documentNumber: true,
        estudianteGrados: {
          where: { grado: { cicloId } },
          select: {
            grado: {
              select: {
                nombre: true,
                seccion: true,
                sede: { select: { nombre: true } },
                ciclo: { select: { nombre: true } }
              }
            }
          }
        }
      }
    });

    // Materias y notas por periodo
    const notas = await prisma.notaMateriaPeriodo.findMany({
      where: { estudianteId: user.id, periodo: { cicloId } },
      include: { materia: true, periodo: true }
    });

    return NextResponse.json({ estudiante, notas });
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
