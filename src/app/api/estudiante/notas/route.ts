import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Devuelve el promedio (nota final) de un estudiante para una materia y periodo
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);
    // Solo el propio estudiante, docentes o admin pueden consultar
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'No autorizado (usuario no encontrado)' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const estudianteId = Number(searchParams.get('estudianteId'));
    const materiaId = Number(searchParams.get('materiaId'));
    const periodoId = Number(searchParams.get('periodoId'));
    if (!estudianteId || !materiaId || !periodoId) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
    // Seguridad: solo el propio estudiante, docentes o admin pueden consultar
    if (user.role === 'STUDENT' && user.id !== estudianteId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }
    // Buscar todas las notas
    const notas = await prisma.notaMateriaPeriodo.findMany({
      where: { estudianteId, materiaId, periodoId },
      select: { valor: true },
    });
    if (!notas.length) {
      return NextResponse.json({ promedio: null, cantidad: 0 });
    }
    const suma = notas.reduce((acc, n) => acc + n.valor, 0);
    const promedio = suma / notas.length;
    return NextResponse.json({ promedio, cantidad: notas.length });
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
