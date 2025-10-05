
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '../../../../lib/prisma';

initFirebaseAdmin();

// GET: Devuelve los grados y asignaturas asignados al docente autenticado
export async function GET(req: NextRequest) {
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
    // Buscar asignaciones del docente, trayendo materiaGrado, materia, grado y ciclo
    const asignaciones = await prisma.materiaGradoDocente.findMany({
      where: { docenteId },
      include: {
        materiaGrado: {
          include: {
            materia: true,
            grado: { include: { ciclo: true } },
          },
        },
      },
    });
    // Formatear para frontend
    const resultado = asignaciones.map(a => ({
      id: a.id,
      materiaGradoId: a.materiaGradoId,
      materiaId: a.materiaGrado.materiaId,
      gradoId: a.materiaGrado.gradoId,
      cicloId: a.materiaGrado.grado.cicloId,
      materia: a.materiaGrado.materia,
      grado: a.materiaGrado.grado,
      ciclo: a.materiaGrado.grado.ciclo,
    }));
    return NextResponse.json(resultado);
  } catch (error) {
    return NextResponse.json({ error: 'No autorizado (token inválido)' }, { status: 401 });
  }
}
