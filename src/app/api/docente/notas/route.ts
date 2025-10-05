
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// POST: Guardar o actualizar notas de estudiantes para una materia/grado/periodo
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);
    // Busca el usuario en la base de datos y verifica el rol
    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, email: true, role: true },
    });
    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }
    const docenteId = user.id;
    const body = await req.json();
    const { gradoId, materiaId, periodoId, notas } = body;
    if (!gradoId || !materiaId || !periodoId || !Array.isArray(notas)) {
      return NextResponse.json({ error: 'Faltan parámetros' }, { status: 400 });
    }
    // Validar asignación: buscar MateriaGrado y luego MateriaGradoDocente
    const materiaGrado = await prisma.materiaGrado.findFirst({
      where: { gradoId, materiaId },
    });
    if (!materiaGrado) {
      return NextResponse.json({ error: 'No existe esa asignación grado/materia' }, { status: 404 });
    }
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: { docenteId, materiaGradoId: materiaGrado.id },
    });
    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado para este grupo/materia' }, { status: 403 });
    }
    // Guardar o actualizar notas
    for (const nota of notas) {
      const { estudianteId, valor } = nota;
      if (!estudianteId || typeof valor !== 'number') continue;
      await prisma.notaMateriaPeriodo.upsert({
        where: {
          estudianteId_materiaId_periodoId: {
            estudianteId,
            materiaId,
            periodoId,
          },
        },
        update: { valor },
        create: {
          estudianteId,
          materiaId,
          periodoId,
          valor,
        },
      });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
