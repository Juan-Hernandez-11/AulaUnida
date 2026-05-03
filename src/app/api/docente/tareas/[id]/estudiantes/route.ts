import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const params = await context.params;
    const tareaId = parseInt(params.id);

    // Obtener la tarea
    const tarea = await prisma.tarea.findUnique({
      where: { id: tareaId },
      include: { materia: true },
    });

    if (!tarea) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    // Verificar que el docente tiene asignada la materia
    const asignacion = await prisma.materiaGradoDocente.findFirst({
      where: {
        docenteId: user.id,
        materiaGrado: {
          materiaId: tarea.materiaId,
        },
      },
      include: {
        materiaGrado: true,
      },
    });

    if (!asignacion) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    // Obtener los estudiantes del grado
    const estudiantes = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        estudianteGrados: {
          some: {
            gradoId: asignacion.materiaGrado.gradoId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return NextResponse.json({ estudiantes });
  } catch (error) {
    console.error('Error en GET /api/docente/tareas/[id]/estudiantes:', error);
    return NextResponse.json({ error: 'Error al obtener estudiantes' }, { status: 500 });
  }
}
