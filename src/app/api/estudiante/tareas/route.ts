import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initFirebaseAdmin } from '@/lib/firebaseAdmin';
import { prisma } from '@/lib/prisma';

initFirebaseAdmin();

// GET: Obtener tareas asignadas al estudiante
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

    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'No autorizado (solo estudiante)' }, { status: 403 });
    }

    const estudianteId = user.id;

    // Obtener grados del estudiante
    const gradosEstudiante = await prisma.gradoEstudiante.findMany({
      where: { estudianteId },
      include: { grado: true },
    });

    const gradoIds = gradosEstudiante.map(ge => ge.grado.id);

    if (gradoIds.length === 0) {
      return NextResponse.json({ tareas: [] });
    }

    // Obtener materias del estudiante a través de los grados
    const materiasGrado = await prisma.materiaGrado.findMany({
      where: {
        gradoId: {
          in: gradoIds,
        },
      },
      include: {
        materia: true,
      },
    });

    const materiaIds = materiasGrado.map(mg => mg.materia.id);

    // Obtener tareas de esas materias
    const tareas = await prisma.tarea.findMany({
      where: {
        materiaId: {
          in: materiaIds,
        },
      },
      include: {
        materia: true,
        entregas: {
          where: { estudianteId },
          include: {
            calificacion: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Enriquecer con estado de entrega
    const tareasEnriquecidas = tareas.map(tarea => ({
      ...tarea,
      entrega: tarea.entregas[0] || null,
      entregada: tarea.entregas.length > 0,
      calificada: tarea.entregas.some(e => e.calificacion !== null),
    }));

    return NextResponse.json({ tareas: tareasEnriquecidas });
  } catch (error) {
    console.error('Error en GET /api/estudiante/tareas:', error);
    return NextResponse.json({ error: 'Error al obtener tareas' }, { status: 500 });
  }
}

// POST: Entregar tarea
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

    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'No autorizado (solo estudiante)' }, { status: 403 });
    }

    const estudianteId = user.id;
    const body = await req.json();
    const { tareaId, texto, archivoUrl } = body;

    if (!tareaId) {
      return NextResponse.json({ error: 'Falta parámetro: tareaId' }, { status: 400 });
    }

    // Verificar que la tarea existe
    const tarea = await prisma.tarea.findUnique({
      where: { id: tareaId },
    });

    if (!tarea) {
      return NextResponse.json({ error: 'Tarea no encontrada' }, { status: 404 });
    }

    // Verificar que el estudiante tiene acceso (materia en su grado)
    const gradosEstudiante = await prisma.gradoEstudiante.findMany({
      where: { estudianteId },
      include: { grado: true },
    });

    const gradoIds = gradosEstudiante.map(ge => ge.grado.id);

    const materiaEnGrado = await prisma.materiaGrado.findFirst({
      where: {
        materiaId: tarea.materiaId,
        gradoId: {
          in: gradoIds,
        },
      },
    });

    if (!materiaEnGrado) {
      return NextResponse.json({ error: 'No tienes acceso a esta tarea' }, { status: 403 });
    }

    // Verificar si ya existe entrega
    const entregaExistente = await prisma.entrega.findFirst({
      where: {
        tareaId,
        estudianteId,
      },
    });

    let entrega;
    if (entregaExistente) {
      // Actualizar entrega existente
      entrega = await prisma.entrega.update({
        where: { id: entregaExistente.id },
        data: {
          texto: texto || entregaExistente.texto,
          archivoUrl: archivoUrl || entregaExistente.archivoUrl,
          entregadaAt: new Date(),
          estado: 'entregada',
        },
        include: {
          calificacion: true,
        },
      });
    } else {
      // Crear nueva entrega
      entrega = await prisma.entrega.create({
        data: {
          tareaId,
          estudianteId,
          texto: texto || null,
          archivoUrl: archivoUrl || null,
          estado: 'entregada',
        },
        include: {
          calificacion: true,
        },
      });
    }

    return NextResponse.json({ 
      entrega,
      message: 'Tarea entregada correctamente',
    });
  } catch (error) {
    console.error('Error en POST /api/estudiante/tareas:', error);
    return NextResponse.json({ error: 'Error al entregar tarea' }, { status: 500 });
  }
}
