import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Obtener entregas de una tarea específica
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }

    const url = new URL(req.url);
    const tareaId = url.searchParams.get('tareaId') ? parseInt(url.searchParams.get('tareaId')!) : null;

    if (!tareaId) {
      return NextResponse.json({ error: 'Falta parámetro: tareaId' }, { status: 400 });
    }

    // Verificar que la tarea pertenece a una materia asignada al docente
    const tarea = await prisma.tarea.findUnique({
      where: { id: tareaId },
      include: { materia: true },
    });

    if (!tarea) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    const materiasDocente = await prisma.materiaDocente.findUnique({
      where: {
        materiaId_docenteId: {
          materiaId: tarea.materiaId,
          docenteId: user.id,
        },
      },
    });

    if (!materiasDocente) {
      return NextResponse.json({ error: 'No autorizado para ver estas entregas' }, { status: 403 });
    }

    // Obtener entregas
    const entregas = await prisma.entrega.findMany({
      where: { tareaId },
      include: {
        estudiante: {
          select: { id: true, name: true, email: true },
        },
        calificacion: true,
      },
      orderBy: { entregadaAt: 'desc' },
    });

    return NextResponse.json({ entregas });
  } catch (error) {
    console.error('Error en GET /api/docente/entregas:', error);
    return NextResponse.json({ error: 'Error al obtener entregas' }, { status: 500 });
  }
}

// POST: Calificar una entrega
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado (token faltante)' }, { status: 401 });
    }
    const idToken = authHeader.replace('Bearer ', '');
    const decoded = await getAuth().verifyIdToken(idToken);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decoded.uid },
      select: { id: true, role: true },
    });

    if (!user || user.role !== 'DOCENTE') {
      return NextResponse.json({ error: 'No autorizado (solo docente)' }, { status: 403 });
    }

    const body = await req.json();
    const { entregaId, valor, retroalimentacion, periodoId } = body;

    if (!entregaId || typeof valor !== 'number' || !periodoId) {
      return NextResponse.json({ error: 'Faltan parámetros: entregaId, valor (número), periodoId' }, { status: 400 });
    }

    if (valor < 0 || valor > 100) {
      return NextResponse.json({ error: 'La calificación debe estar entre 0 y 100' }, { status: 400 });
    }

    // Verificar que la entrega existe y obtener la tarea asociada
    const entrega = await prisma.entrega.findUnique({
      where: { id: entregaId },
      include: {
        tarea: { include: { materia: true } },
      },
    });

    if (!entrega) {
      return NextResponse.json({ error: 'Entrega no encontrada' }, { status: 404 });
    }

    // Verificar permisos
    const materiasDocente = await prisma.materiaDocente.findUnique({
      where: {
        materiaId_docenteId: {
          materiaId: entrega.tarea.materiaId,
          docenteId: user.id,
        },
      },
    });

    if (!materiasDocente) {
      return NextResponse.json({ error: 'No autorizado para calificar esta entrega' }, { status: 403 });
    }

    // Verificar que el período existe
    const periodo = await prisma.periodo.findUnique({
      where: { id: periodoId },
    });

    if (!periodo) {
      return NextResponse.json({ error: 'Período no encontrado' }, { status: 404 });
    }

    // Si ya existe calificación, actualizarla; si no, crearla
    let calificacion = await prisma.calificacion.findUnique({
      where: { entregaId },
    });

    if (calificacion) {
      calificacion = await prisma.calificacion.update({
        where: { id: calificacion.id },
        data: {
          valor,
          retroalimentacion: retroalimentacion || '',
          calificadaAt: new Date(),
        },
      });
    } else {
      calificacion = await prisma.calificacion.create({
        data: {
          entregaId,
          periodoId,
          valor,
          retroalimentacion: retroalimentacion || '',
        },
      });
    }

    // Actualizar estado de la entrega
    await prisma.entrega.update({
      where: { id: entregaId },
      data: { estado: 'calificada' },
    });

    return NextResponse.json({ calificacion, message: 'Calificación guardada correctamente' });
  } catch (error) {
    console.error('Error en POST /api/docente/entregas:', error);
    return NextResponse.json({ error: 'Error al calificar entrega' }, { status: 500 });
  }
}
